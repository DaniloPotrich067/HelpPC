
/**
 * Help PC — API de Orçamentos
 * Integração: Next.js → Google Apps Script → Google Sheets / Drive
 */

// =====================================================
// CONFIGURAÇÃO
// =====================================================

const CONFIG = {
  SPREADSHEET_ID: '1QcZnYVMVpkyS037pMrtxiRRvtOF4Tm6bRdRYzbc0QxY',
  SHEET_ID: 1130081712,
  SHEET_NAME: 'Orçamentos',
  FOLDER_ID: '13lVFEPv-qE5L13WskJypSHPVXAsUywbv',
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  INITIAL_STATUS: 'Novo'
};

const EXPECTED_HEADERS = [
  'ID',
  'Data',
  'Nome',
  'Telefone',
  'Serviço',
  'Equipamento',
  'Descrição',
  'Anexo',
  'Status'
];

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf'
];

const ALLOWED_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'pdf'
];

const MAX_LENGTHS = {
  name: 100,
  phone: 25,
  service: 100,
  equipment: 100,
  description: 2000
};


// =====================================================
// GET — VERIFICAÇÃO DA API
// =====================================================

function doGet() {
  return jsonResponse({
    success: true,
    message: 'API de orçamentos da Help PC ativa.'
  });
}


// =====================================================
// POST — RECEBIMENTO DO ORÇAMENTO
// =====================================================

function doPost(e) {
  const lock = LockService.getScriptLock();
  let stage = 'request_validation';
  let attachmentUrl = '';

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        error: 'Nenhum dado recebido.'
      });
    }

    const data = JSON.parse(e.postData.contents);

    // Validação da chave de integração
    const expectedSecret = PropertiesService
      .getScriptProperties()
      .getProperty('HELPPC_API_SECRET');

    if (
      !expectedSecret ||
      !data.secret ||
      data.secret !== expectedSecret
    ) {
      return jsonResponse({
        success: false,
        error: 'Não autorizado.'
      });
    }

    // Validação dos campos e do anexo
    const validation = validateData(data);

    if (!validation.valid) {
      return jsonResponse({
        success: false,
        code: 'VALIDATION_ERROR',
        stage: stage,
        error: validation.error
      });
    }

    // Evita gravações simultâneas conflitantes
    stage = 'lock_acquire';
    lock.waitLock(30000);

    stage = 'spreadsheet_open';

    if (!CONFIG.SPREADSHEET_ID) {
      throw new Error('O ID da planilha não foi configurado.');
    }

    const spreadsheet = SpreadsheetApp.openById(
      CONFIG.SPREADSHEET_ID
    );

    stage = 'sheet_lookup';
    let sheet = spreadsheet.getSheetById(CONFIG.SHEET_ID);

    // O gid é a referência principal. O nome é apenas fallback caso a aba
    // tenha sido recriada e recebido outro gid.
    if (!sheet && CONFIG.SHEET_NAME) {
      sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    }

    if (!sheet) {
      throw new Error(
        'A aba não foi encontrada pelo ID nem pelo nome configurados.'
      );
    }

    stage = 'header_validation';
    validateSheetHeaders(sheet);

    // Salva o arquivo no Drive, caso exista
    if (data.file) {
      stage = 'attachment_save';
      attachmentUrl = saveAttachment(data.file);
    }

    // Monta o registro na ordem exata das colunas
    const record = [
      Utilities.getUuid(),
      new Date(),
      data.name.trim(),
      data.phone.trim(),
      data.service.trim(),
      (data.equipment || '').trim(),
      data.description.trim(),
      attachmentUrl,
      CONFIG.INITIAL_STATUS
    ];

    stage = 'row_append';
    sheet.appendRow(record);

    return jsonResponse({
      success: true,
      message: 'Orçamento recebido com sucesso.',
      id: record[0]
    });

  } catch (error) {
    const rowWriteFailed = stage === 'row_append';
    const code = rowWriteFailed ? 'ROW_WRITE_FAILED' : 'INTEGRATION_ERROR';

    console.error(JSON.stringify({
      event: 'orcamento_failed',
      code: code,
      stage: stage,
      partial: Boolean(attachmentUrl)
    }));

    return jsonResponse({
      success: false,
      code: code,
      stage: stage,
      partial: Boolean(attachmentUrl),
      error: rowWriteFailed
        ? 'O anexo foi salvo, mas a linha não foi gravada.'
        : 'Não foi possível concluir o registro.'
    });

  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}


// =====================================================
// VALIDAÇÃO DOS DADOS
// =====================================================

function validateData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      valid: false,
      error: 'Formato de dados inválido.'
    };
  }

  const requiredFields = [
    'name',
    'phone',
    'service',
    'description'
  ];

  for (const field of requiredFields) {
    if (
      typeof data[field] !== 'string' ||
      !data[field].trim()
    ) {
      return {
        valid: false,
        error: 'O campo obrigatório "' + field + '" é inválido.'
      };
    }
  }

  for (const field in MAX_LENGTHS) {
    if (
      typeof data[field] !== 'string' ||
      data[field].length > MAX_LENGTHS[field]
    ) {
      return {
        valid: false,
        error: 'O campo "' + field + '" excede o limite permitido.'
      };
    }
  }

  if (data.description.trim().length < 10) {
    return {
      valid: false,
      error: 'A descrição deve conter pelo menos 10 caracteres.'
    };
  }

  if (
    data.equipment !== undefined &&
    data.equipment !== null &&
    typeof data.equipment !== 'string'
  ) {
    return {
      valid: false,
      error: 'O campo equipamento é inválido.'
    };
  }

  if (data.file !== undefined && data.file !== null) {
    const file = data.file;

    if (
      typeof file !== 'object' ||
      Array.isArray(file) ||
      typeof file.name !== 'string' ||
      typeof file.base64 !== 'string'
    ) {
      return {
        valid: false,
        error: 'Os dados do anexo são inválidos.'
      };
    }

    if (!file.name.trim() || !file.base64.trim()) {
      return {
        valid: false,
        error: 'O nome ou o conteúdo do anexo está vazio.'
      };
    }

    if (file.base64.startsWith('data:')) {
      return {
        valid: false,
        error: 'Envie o conteúdo Base64 sem o prefixo data URL.'
      };
    }

    if (
      file.base64.length % 4 !== 0 ||
      !/^[A-Za-z0-9+/]*={0,2}$/.test(file.base64)
    ) {
      return {
        valid: false,
        error: 'O conteúdo do anexo não é um Base64 válido.'
      };
    }

    const fileType = file.type || file.mimeType;

    if (typeof fileType !== 'string' || !ALLOWED_TYPES.includes(fileType)) {
      return {
        valid: false,
        error: 'Formato de anexo não permitido.'
      };
    }

    const extension = getExtension(file.name);

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return {
        valid: false,
        error: 'A extensão do arquivo não é permitida.'
      };
    }

    // Limite aproximado antes da decodificação.
    const maxBase64Length = Math.ceil(
      CONFIG.MAX_FILE_SIZE / 3
    ) * 4 + 4;

    if (file.base64.length > maxBase64Length) {
      return {
        valid: false,
        error: 'O anexo excede o limite de 5 MB.'
      };
    }
  }

  return { valid: true };
}


// =====================================================
// VALIDAÇÃO DOS CABEÇALHOS DA PLANILHA
// =====================================================

function validateSheetHeaders(sheet) {
  const lastColumn = Math.max(
    sheet.getLastColumn(),
    EXPECTED_HEADERS.length
  );

  const actualHeaders = sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0]
    .map(function (header) {
      return header.trim();
    });

  for (let i = 0; i < EXPECTED_HEADERS.length; i++) {
    if (actualHeaders[i] !== EXPECTED_HEADERS[i]) {
      throw new Error(
        'Cabeçalho incorreto na coluna ' +
        (i + 1) +
        '. Esperado: "' +
        EXPECTED_HEADERS[i] +
        '". Encontrado: "' +
        (actualHeaders[i] || '') +
        '".'
      );
    }
  }
}


// =====================================================
// SALVAMENTO DO ANEXO NO GOOGLE DRIVE
// =====================================================

function saveAttachment(file) {
  const extension = getExtension(file.name);
  const fileType = file.type || file.mimeType;

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error('Extensão de arquivo não permitida.');
  }

  if (typeof fileType !== 'string' || !ALLOWED_TYPES.includes(fileType)) {
    throw new Error('Tipo de arquivo não permitido.');
  }

  let decodedBytes;

  try {
    decodedBytes = Utilities.base64Decode(file.base64);
  } catch (error) {
    throw new Error('Não foi possível decodificar o anexo.');
  }

  if (
    !decodedBytes ||
    decodedBytes.length === 0 ||
    decodedBytes.length > CONFIG.MAX_FILE_SIZE
  ) {
    throw new Error(
      'O anexo está vazio ou excede o limite de 5 MB.'
    );
  }

  if (!CONFIG.FOLDER_ID) {
    throw new Error('A pasta de anexos não foi configurada.');
  }

  const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);

  // Evita caracteres problemáticos no nome do arquivo.
  const safeName = file.name
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/[\r\n]/g, '_')
    .trim()
    .substring(0, 150);

  const blob = Utilities.newBlob(
    decodedBytes,
    fileType,
    safeName || ('anexo.' + extension)
  );

  const savedFile = folder.createFile(blob);

  return savedFile.getUrl();
}


// =====================================================
// UTILITÁRIOS
// =====================================================

function getExtension(filename) {
  const parts = String(filename).toLowerCase().split('.');

  return parts.length > 1
    ? parts.pop()
    : '';
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

interface FormatParams {
  data?: any | any[] | void[],
  status: number,
}

export interface FormatApiResponse {
  data: any ,
  msg: string,
  code: number,
  error: boolean
}

// ajeitar essa função para modelar todos os request depois
function format({data = [], status}: FormatParams, errors?: any) {
  let code: number;
  let error: boolean;
  let errorsFormated = []
  let msg;

  if (errors?.message || errors?.mensagem) {
    code = 400;
    console.log(errors)
    let findField = errors.message.split(' ') || errors.mensagem.split(' ')
    errorsFormated.push({
      field: findField[0].toLowerCase(),
      msg: "Campo invalido"
    })
    error = true;
  } else {
    code = 404;
    msg = "Erro ao obter dados";
    error = true;
    for (const error in errors) {
      errorsFormated.push({
        field: error,
        msg: errors[error][0]
      })
    }
  }
  if (status == 200) {
    msg = "Sucesso ao salvar dados"
    error = false
  }
  if (status == 204) {
    msg = "Sucesso ao criar objeto"
    error = false
  }

  if (status && status >= 300) {
    msg = "Erro ao obter dados";
    data = []
  }
  if (errorsFormated.length > 0) {
    code = 404;
    msg = "Erro ao obter dados";
    data = errorsFormated;
    error = true
  }

  return {
    msg,
    data,
    code,
    error
  } as FormatApiResponse
}

export default format;

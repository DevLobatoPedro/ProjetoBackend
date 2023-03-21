import dbKnex from '../data/db_config.js'

export const lojaIndex = async (req, res) => {
  try {

    const empresas = await dbKnex.select("*").from("empresas")
    res.status(200).json(empresas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const lojaStore = async (req, res) => {

  const { nome, cnpj, cidade} = req.body

  if (!nome || !cnpj|| !cidade) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, CNPJ e a cidade da empresa" })
    return
  }
  try {

    const novo = await dbKnex('empresas')
      .insert({ nome, cnpj, cidade})
    res.json({ id: novo[0], msg: "Ok! Inserido com sucesso" })
  }
  catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }

}

export const lojaDelete = async (req, res) => {
  
  const { id } = req.params;

  try {
    await dbKnex("empresas").where({ id }).del()
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const lojaUpdate = async (req, res) => {


  const { id } = req.params;

  const { nome, cnpj, cidade} = req.body

  if (!nome || !cnpj || !cidade) {

    res.status(400).json(

      {
        id: 0,
        msg: "Erro... informe nome, cnpj e a cidade da loja!"
      })
    return
  }

  try {
    await dbKnex("empresas").where({ id })
      .update({ nome, cnpj, cidade})
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const lojaPesq = async (req, res) => {

  const { cidade } = req.params

  try {

    const empresas = await dbKnex("empresas").whereLike('cidade', `%${cidade}%`)

    res.status(200).json(empresas)

  } catch (error) {

    res.status(400).json({ id: 0, msg: "Erro: " + error.message })

  }

}
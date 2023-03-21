import dbKnex from '../data/db_config.js'

export const estoqueIndex = async (req, res) => {
  try {

    const estoque = await dbKnex.select("*").from("estoque")
    res.status(200).json(estoque)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const estoqueStore = async (req, res) => {

  const { marca, hardware, modelo, preco} = req.body

  if (!marca || !hardware || !modelo || !preco) {
    res.status(400).json({ id: 0, msg: "Erro... informe marca, hardware, modelo e o preço do produto" })
    return
  }
  try {

    const novoHard = await dbKnex("estoque")
      .insert({ marca, hardware, modelo, preco})
    res.json({ id: novoHard[0], msg: "Ok! Inserido com sucesso" })
  }
  catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }

}

export const estoqueDelete = async (req, res) => {
  
  const { id } = req.params;

  try {
    await dbKnex("estoque").where({ id }).del()
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const estoqueUpdate = async (req, res) => {

  const { id } = req.params;

  const { marca, hardware, modelo, preco} = req.body

  if (!marca || !hardware || !modelo || !preco) {

    res.status(400).json(

      {
        id: 0,
        msg: "Erro... informe marca, hardware, modelo e preço do produto!"
      })
    return
  }

  try {
    await dbKnex("estoque").where({ id })
      .update({ marca, hardware , modelo, preco})
    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const estoquePesq = async (req, res) => {

  const { marca } = req.params

  try {

    const estoque = await dbKnex("estoque").whereLike('marca', `%${marca}%`)

    res.status(200).json(estoque)

  } catch (error) {

    res.status(400).json({ id: 0, msg: "Erro: " + error.message })

  }

}

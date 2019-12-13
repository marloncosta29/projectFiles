import React, { useState, useCallback, useEffect } from 'react'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import api from '../../services/api'
import { Link } from 'react-router-dom';

interface Data {
  name: string
}

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState<Data[]>([{ name: 'facebook/react' }])
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)


  //Buscar
  useEffect(() => {
    const repos = localStorage.getItem('repos')
    if (repos) {
      setRepositorios(JSON.parse(repos))
    }
  }, [])
  //Salvar
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios))
  }, [repositorios])



  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(e.target.value)
  }
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    async function submit() {
      setLoading(true);
      setAlert(false)
      try {

        if (newRepo === '') {
          setAlert(true)
          throw new Error("Voce precisa indicar um repositorio")
        }
        const hasRepo = repositorios.find(r => r.name === newRepo)
        if (hasRepo) {
          setAlert(true)
          throw new Error('Repositorio Ja encontrado')
        }
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name
        }
        setRepositorios([...repositorios, data])
        setNewRepo('');
      } catch (error) {
        setAlert(true);
      } finally {
        setLoading(false)
      }



    }

    submit()
  }, [newRepo, repositorios])

  const handleDelete = useCallback(name => {
    console.log(name)
    const reposFilter = repositorios.filter(r => r.name !== name);
    setRepositorios(reposFilter);
  }, [repositorios])

  return (
    <Container>
      <h1><FaGithub size={25} /> Meus Repositorios</h1>
      {alert}
      <Form onSubmit={handleSubmit} error={alert}>
        <input type="text" placeholder="Adicionar Repositorios" value={newRepo} onChange={handleInputChange} />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} />}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map(repo => {
          console.log(repo)
          return <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)} >
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}</span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}><FaBars size={20} /></Link>
          </li>
        }
        )}
      </List>
    </Container >
  )
}

import React, { useState, useCallback } from 'react'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'

import api from '../../services/api'

interface Data {
  name: string
}

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState<Data[]>([{ name: 'facebook/react' }])
  const [loading, setLoading] = useState(false)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(e.target.value)
  }
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    async function submit() {
      setLoading(true);
      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name
        }
        setRepositorios([...repositorios, data])
        setNewRepo('');
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(setLoading(false), 5000)


      }



    }

    submit()
  }, [newRepo, repositorios])

  return (
    <Container>
      <h1><FaGithub size={25} /> Meus Repositorios</h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder="Adicionar Repositorios" value={newRepo} onChange={handleInputChange} />
        <SubmitButton loading={loading}>
          {loading ? <FaSpinner color="#FFF" size={14} /> : <FaPlus color="#FFF" size={14} />}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map(repo => {
          console.log(repo)
          return <li key={repo.name}>
            <DeleteButton onClick={() => { }}>
              <FaTrash size={14} />
            </DeleteButton>
            <span>{repo.name}</span>
            <a href="#"><FaBars size={20} /></a>
          </li>
        }
        )}
      </List>
    </Container>
  )
}

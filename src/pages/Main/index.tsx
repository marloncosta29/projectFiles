import React from 'react'
import { Container, Form, SubmitButton } from './styles'
import { FaGithub, FaPlus } from 'react-icons/fa'
interface Props { }
interface State { }

class Main extends React.Component<Props, State> {
  render() {
    return (
      <Container>

        <h1><FaGithub size={25} /> Meus Repositorios</h1>

        <Form onSubmit={() => { }}>
          <input type="text" placeholder="Adicionar Repositorios" />
          <SubmitButton>
            <FaPlus color="#FFF" size={14} />
          </SubmitButton>
        </Form>

      </Container>
    )
  }
}

export default Main
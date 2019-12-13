import Styled, { StyledComponent, keyframes, css } from 'styled-components'

interface Button {
  loading: number
}
interface Form {
  error: boolean
}
export const Container = Styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  padding: 30px;
  margin: 80px auto;
  h1{
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    
    svg{
      margin-right: 10px
    }
    
  }
`;

export const Form: StyledComponent<"form", any, Form, never> = Styled.form<Form>`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input{
    flex:1;
    border: 1px solid ${p => p.error ? '#FF0000' : '#DDD'};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px
  }
`;

//Criando animação
const anim = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }

`


export const SubmitButton: StyledComponent<"button", any, Button, never> = Styled.button.attrs<Button>(({ loading }) => ({
  type: 'submit',
  disabled: loading
})) <Button>`
    background: #0D2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding:0 15px;
    display: flex;
    justify-content: center;
    align-items: center;


  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5
  }

  ${props => {
    return props.loading && css`
    svg{
      animation: ${anim} 2s linear infinite
    }
  `}}
`;

export const List = Styled.ul`
  list-style: nome;
  margin-top:20px;

    li{
      padding: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      & + li{
        border-top: 1px solid #eee;
      }

      a{
        color: #0D2636;
        text-decoration: none;
      }
    }

`;

export const DeleteButton: StyledComponent<"button", Button, {}, never> = Styled.button.attrs<Button>(() => ({
  type: 'button',
})) <Button>`
    background: transparent;
    color: #0D2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;
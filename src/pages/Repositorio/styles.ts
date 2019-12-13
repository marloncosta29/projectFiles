import Styled, { StyledComponent } from 'styled-components'
import { Link } from 'react-router-dom';

export const Container = Styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  padding: 30px 30px;
  margin: 80px auto;

`;
export const Owner = Styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    width: 150px;
    border-radius: 20%;
    margin:20px 0;
  }
  h1{
    font-size: 30px;
    color: #0D2636;
  }
  p{
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`
export const Loading = Styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const VoltarButton = Styled(Link)`
  border:0;
  outline:0;
  background: transparent; 
`

export const IssuesList = Styled.ul`
  margin-top: 30px;
  padding-top:30px;
  border-top: 1px solid #EEE;
  list-style: none;

  li{
    display: flex;
    padding: 15px 10px;
    & + li{
      margin-top: 12px
    }

    img{
      width:36px;
      height:36px;
      border-radius: 50%;
      border: 2px solid #0D2636
    }
    div{
      flex:1;
      margin-left:12px;
      p{
        margin-top:10px;
        font-size:12px;
        color:#000
      }
    }

    strong{
      font-size: 15px;
      a{
        text-decoration: none;
        color: #222;
        transform: 0.3s;
        &:hover{
          color: #0071db;
        }
      }
      span{
        background: #222;
        color: #FFF;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 5px 7px;
        margin-left: 10px
      }
    }

  }

`

export const PageAction = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button{
    outline: 0;
    border: 0;
    background: #222;
    color: #FFF;
    padding: 5px 10px;
    border-radius:4px;
    &:disabled{
      cursor: not-allowed;
      opacity: 0.5
    }

  }

`

interface FilterButton {
  active: number
}

export const FilterList: StyledComponent<'div', any, { active: number }, never> = Styled.div<FilterButton>`
  margin:15px 0;

  button{
    outline:0;
    border:0;
    padding: 8px;
    border-radius: 400px;
    margin: 0 3px;

    &:nth-child(${props => props.active + 1}) {
      background: #0071db;
      color: #FFF
    }


  }

`
import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface FormProps {
  hasError: boolean
}

export const Form = styled.form<FormProps>`
  margin-top: 130px;
  max-width: 700px;

  display: flex;

  input {
    width: 437px;
    height: 59px;
    padding: 0 24px;    
    border-radius: 5px 0 0 5px;
    border: 2px solid #FFF;
    border-right: 0;
    
    ${(props) => props.hasError && css`
      border-color:#c53030
    `};

    &::placeholder {
      color: #A8A8B3;
    }
  }

  button {
    width: 200px;
    height: 59px;
    border: 0;
    background: #3698AC;
    color: #FFF;
    font-size: 25px;
    font-weight: 500;
    border-radius: 0 5px 5px 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#3698AC')};
    }
  }
`

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`

export const Cards = styled.div`  
  margin: 50px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  
  div {    
    display: flex;    
    flex-direction: column;
    align-items: center;    

    width: 241px;
    height: 238px;
    background: #FFF;
    position:relative;
    margin-bottom: 5px;

    border-radius: 6px 6px 0 0;    

    img {
      width: 69px;
      height: 69px;
      margin-top: 10px;
    }

    ul {
      margin-top: 30px;
      list-style: none;

      li {
        font-size: 18px;        
      }
    }

    button {
      width:100%;
      height: 43px;
      bottom: 0;
      position: absolute;

      border: 0;
      background: #42CBB2;
      font-weight: bold;

      font-size: 16px;

      display: flex;
      align-items: center;
      justify-content: center;      
    }
  }
`

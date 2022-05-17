import styled from "styled-components";

export const Container = styled.div`
table{
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 4px;
  margin-top:10px;

  .lastTDArrow{
      width:2%;
  }

  th{
      text-align: left;
      font-size:12px;
      padding:10px;
      padding-bottom:0px;
      position: relative;
  }

  thead{
      tr{
          td{
              padding:10px;
              position:relative;
          }
      }
  }

  .faSort{
      opacity: 0.3;
      position: absolute;
      margin-left: 5px;
      top: 10px;
      right: 0px;
  }

  .faSortActive{
      opacity: 0.3;
      position: absolute;
      margin-left: 5px;
      top: 10px;
      right: 0px;
  }

  tbody{
      tr{
          td{
              font-family: 'Poppins', sans-serif;
              font-size: 12px;
              padding: 10px;

              background: rgb(241, 242, 246);
              background: linear-gradient(
                  0deg,
                  rgba(241, 242, 246, 1) 0%,
                  rgba(255, 255, 255, 1) 100%
              );
              padding: 15px;
              box-sizing: border-box;
              font-size: 12px;
              border: none !important;
              color: $primary;
              &:first-child {
                  border-left-style: solid #fff;
                  border-top-left-radius: 8px;
                  border-bottom-left-radius: 8px;
              }
              &:last-child {
                  border-right-style: solid #fff;
                  border-bottom-right-radius: 8px;
                  border-top-right-radius: 8px;
              }
          }
      }
  }
}

`;

export const ContainerTable = styled.div`
    display:flex;
    flex-direction: column;
`

export const DateBar = styled.div`
    display:flex;
`

export const ContentTable = styled.div`
    display:flex;

    th{
      font-weight: bold;
      font-size: 11px;
      font-family: 'Poppins', sans-serif;
    }

    tbody{
      tr{
        cursor: pointer;
      }
    }
`

export const PaginationContainer = styled.div`
  display: flex;
  align-itens: center;
  justify-content: flex-end;
  margin: .5rem 0 0 0;
`

export const CounterPagination = styled.div`
  display: flex;
  align-items: center;
  margin: 0 2rem 0 1rem;
  font-size: 12px;
  font-weight: 300;
`

export const PaginationActions = styled.div`
  display: flex;
`

export const ContentReport = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const BoxReport = styled.div`
  display: flex;
  padding: 10px;
  width: 150px;
  justify-content: space-between;
  background: linear-gradient( 
    0deg, rgba(241,242,246,1) 0%, rgba(255,255,255,1) 100% );
        padding: 20px;
        border-radius: 10px;
        width: 200px;
        margin-right: 10px;
        margin-top: 10px;
`

export const InfoDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
  align-items: flex-end;
`

export const TextDescription = styled.div`
  display: flex;
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  text-align:right;
`

export const DataDescription = styled.div`
  display: flex;
  font-size:14px;
`

export const FooterTable = styled.div`
  display: flex;
  font-family: 'Poppins', sans-serif;
  align-items: flex-end;
  margin-top: 10px;

  button{
    padding: 10px;
    box-sizing: border-box;
    background: blue;
    border: none;
    border-radius: 27px;
    color: #FFF;
    padding-left: 20px;
    padding-right:20px;
    background-color: #1d65c9;
  }
`
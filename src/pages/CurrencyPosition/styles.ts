import styled from "styled-components";

export const Container = styled.div`
padding-bottom:100px;
.tableUAT {
.MuiTableCell-root{
  font-size:14px
}

  .faSortActive{
      opacity: 0.3;
      position: absolute;
      margin-left: 5px;
      top: 10px;
      right: 0px;
  }

 
}

`;

export const ContainerTable = styled.div`
    display:flex;
    flex-direction: column;
`

export const Header = styled.div`
    display:flex;
    width: 100%;
    justify-content:space-between;

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
      height:37px;
    }
`

export const DateBar = styled.div`

.react-datepicker{
  font-size:13px;
  width: 250px
}

.react-datepicker__day-names {
  margin-bottom: -8px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
}

.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle {
  top: 0;
  margin-top: -8px;
  left: -121px;
}

.react-datepicker__week {
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  box-sizing: border-box;
}

.react-datepicker__month-container{
  width: 100%
}
    display:flex;

    .customDatePickerWidth, 
.customDatePickerWidth > div.react-datepicker-wrapper, 
.customDatePickerWidth > div > div.react-datepicker__input-container
.customDatePickerWidth > div > div.react-datepicker__input-container input {
   width: 100%;
}
    
    input{
      font-family: arial;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid #CCC;
    }
`

export const ContentTable = styled.div`
    display:flex;

    thead{
      tr{
        th:nth-child(2){
          min-width: 160px;
          width: 160px;
          text-align: right;
        }

        th:nth-child(3){
          min-width: 160px;
          width: 160px;
          text-align: right;
        }
      }
    }

    th{
      span{
        font-size:12px;
      }
    }

    .react-datepicker{
      font-size:20px !important;
    }

   
    tbody{

      .bacenOpen{
        text-align:right;
        justify-content:end;
      }

      .new{
        float: right;
        background: white;
        animation: animationFrames 0.5s infinite;
        color: #FFF;
        font-size: 10px;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 6px;
        font-weight: bold;
      }

      @keyframes animationFrames{
        50% {
         background-color: blue;
        }
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
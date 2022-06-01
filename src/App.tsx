import { ChangeEvent,FormEvent, Component, useMemo } from 'react';
import styled ,{keyframes} from 'styled-components';
import { flash, rollIn,bounceInLeft,bounceInRight } from 'react-animations';
import  {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APItypes } from './components/types/interface';
import './App.css';
import PaginationComponent from './components/MainComponents/Pagination';

function App(){
const [items, setItems] = useState <APItypes[]>([])
const [totalItems, setTotalItems] = useState <any[]>([])
const [totalRows, setTotalRows] = useState(0);
const [currentPage, setCurrentPage] = useState(1)
const [perPage, setPage] = useState(5)
const [search, setSearch] = useState(0)
const totalPages = [1,2,3]

useEffect(()=>{
 if(search ){
   console.log(totalItems)
    getAllDatas()
 } else{
   getData(currentPage,perPage)
 }
  
}
,[currentPage,search])
const getAllDatas = async ()=>{
  const total:any[] =[]
 
  const response = await fetch(`https://reqres.in/api/products?per_page=${12}`).then(data=>data.json()).then(res=>total.push(res))


return setTotalItems(total.map(item=>item.data))
}
const getData=  async (page:number, perPage:number)=>{
  try {
    
   const result =  await fetch(`https://reqres.in/api/products?page=${page}&per_page=${perPage}`)
              if(result.ok){
                const data = await result.json()
                setItems(data.data)
                setTotalRows(data.total)
              }
        } catch (error) {
          console.log(error)
      }
        };

const handleSearch =(e:ChangeEvent<HTMLInputElement>)=>{
  setSearch(e.target.valueAsNumber)
  
}

const itemsData =useMemo(()=>{
      let filteredItems = totalItems
      console.log(filteredItems)
      
      if(search){
      const filtered = filteredItems &&  filteredItems[0] && filteredItems[0].filter((item:any)=>item.id === search)
      console.log(filtered)
      return filtered
      }
      return filteredItems
    
 
},[totalItems, search])



return(
  <>
  <StyledCard>
    <CardInner>
   <StyledLabel htmlFor="search">
        Search by ID:
         </StyledLabel>
         <Container>
        <StyledIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </StyledIcon>
    <StyledInputContainer>
        <StyledInput id="search" type="number" value={search} onChange={handleSearch}
           />
           </StyledInputContainer>
      </Container>
      </CardInner>
    </StyledCard>
      {search ?(
        <StyledTable>
      <StyledThhead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Year</th>
        </tr>
      </StyledThhead>
      <tbody>
        
          {itemsData && (
          <tr style={{backgroundColor: `${itemsData[0]?.color}`}}>
            <td>{itemsData[0]?.id}</td>
            <td>{itemsData[0]?.name}</td>
            <td>{itemsData[0]?.year}</td>
            </tr>
             
          )
}
        </tbody>
        </StyledTable>
        ):(
          <>
           <StyledTable>
      <StyledThhead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Year</th>
        </tr>
      </StyledThhead>
  
          <tbody>
          {items.map(item=>(
             <tr style={{backgroundColor: `${item.color}`}}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.year}</td>
            </tr>
          ))}
          </tbody>
          </StyledTable>
          <PaginationComponent totalRows={totalRows} itemsPerPage={perPage} currentPage={currentPage} onPageChange={(page)=>setCurrentPage(page)} />
          </>
        )}
       
     
    
        
  </>
)
}
const animatedInput = keyframes `${flash}`
const animatedTableLeft = keyframes `${bounceInLeft}`
const animatedTableRight = keyframes `${bounceInRight}`
const StyledInput = styled.input`
  background-color: #e3edf7;
  padding: 16px 32px;
  border: none;
  display: block;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  color: #a9b8c9;
  -webkit-appearance: none;
  transition: all 240ms ease-out;
  width: 100%;
  
  &::placeholder {
    color: #6d7f8f;
  }
  
  &:focus {
    outline: none;
    color: #6d7f8f;
    background-color: lighten(#e3edf7, 3%);
  }

`
const Container = styled.div`
display:flex;
`
const StyledIcon = styled.div`
 min-width: 46px;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-right: 12px;
  box-shadow: 
    -2px -2px 6px rgba(#fff, .6),
    2px 2px 12px #c8d8e7;
    
  svg {
    transform: translate(-1px, -1px);    
  }
`
const StyledLabel = styled.label`
  font-family: "Hind", sans-serif;
  display: block;
  background-color:black ;
  color:white ;
  margin-bottom: 12px;
`
const StyledInputContainer = styled.div`
  width:100% ;
   --top-shadow: inset 1px 1px 3px #c5d4e3, inset 2px 2px 6px #c5d4e3;
  --bottom-shadow: inset -2px -2px 4px rgba(255,255,255, .7);
  
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  
  &:before,
  &:after {
    left: 0;
    top: 0;
    display: block;
    content: "";
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  
  &:before {
    box-shadow: var(--bottom-shadow);
  }
  
  &:after {
    box-shadow: var(--top-shadow);
  }
`
const CardInner = styled.div`
   padding: 16px 16px;
  background-color: #e2e9f4;
  border-radius: 10px;
`
const StyledCard = styled.div`
  animation: 2s ${animatedInput} ;
  display:flex ;
  justify-content:center ;
  margin-top:10px ;
  padding: 1px;
  border-radius: 10px;
`
const StyledTable = styled.table`
  width:90%;
  margin:20px ;
  border:2px double goldenrod;
  & th, td {
    padding:.20em .3em;
    text-align:left !important;
    &:nth-child(2) {
      text-align:right;
    }
  }
  border-collapse:separate;
  border-spacing:.25em 1em;
   & tbody tr:nth-child(odd) {
     animation: 2s ${animatedTableLeft} ;
    transform:rotate(0.7deg);
  }
  & thead tr, tbody tr:nth-child(even) {
    animation:2s ${animatedTableRight} ;
    transform:rotate(-0.7deg);
  }
`
const StyledThhead= styled.thead`
  background-color:greenyellow ;
  border: 2px dotted blueviolet ;
  border-radius:50%;
`
export default App






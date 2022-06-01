import React, { useEffect, useMemo } from 'react'
import { Pagination } from 'react-bootstrap'
import { rollIn } from 'react-animations'
import styled, {keyframes} from 'styled-components'
import 'aos/dist/aos.css'
import Aos from 'aos'
interface Props {
    totalRows : number,
    itemsPerPage:number,
    currentPage: number,
    onPageChange: (page:number )=>void
}
const PaginationComponent =({totalRows=0, itemsPerPage=10, currentPage=1, onPageChange}:Props)=>{
    useEffect(()=>{
        Aos.init({ duration: 3000 })
    },[])
    const totalPages = 4
    const paginationItems =useMemo(()=>{
        const pages=[]
        for(let i = 1; i < totalPages; i++){
            pages.push(<StyledPaginationItem key={i} active={i === currentPage} onClick={()=>onPageChange(i)}>{i}</StyledPaginationItem>)
        }
        return pages
    },[totalPages,currentPage])
    return(
        <StyledContainer >
        <StyledPagination>
            <StyledPaginationPrev onClick={()=>onPageChange(currentPage - 1 )} disabled={currentPage === 1}>Prev</StyledPaginationPrev>
            {paginationItems}
            <StyledPaginationNext onClick={()=>onPageChange(currentPage + 1 )} disabled={currentPage === totalPages}>Next</StyledPaginationNext>
        </StyledPagination>
        </StyledContainer>
    )
}
const animatedPagination = keyframes `${rollIn}`
const StyledContainer = styled.div`
    animation: 2s ${animatedPagination} ;
    margin:20px;
    padding: 25px;
    border-radius: 3px;
    box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
    width:450px;
    background: linear-gradient(90deg,transparent, #070707);
    box-shadow: 0 0 5px #2196f3, 0 0 20px #4ec23f, 0 0 5px #0bd397 !important;
    :hover{
        box-shadow: 0 0 10px white, 0 0 40px white, 0 0 10px white !important;
    }
`
const StyledPagination = styled(Pagination)`
    display: flex;
    list-style: none;
`
const StyledPaginationItem = styled(Pagination.Item)`
    flex: 1;
    margin: 0px 5px;
    background: #dde1e7;
    border-radius: 3px;
    box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
    font-size: 18px;
    text-decoration: none;
    color: #4d3252;
    height: 40px;
    width: 55px;
    display: block;
    line-height: 45px;
 
    `
    const StyledPaginationPrev =styled(Pagination.Prev)`
    flex: 1;
    margin: 0px 5px;
    background: #dde1e7;
    border-radius: 3px;
    box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
    font-size: 18px;
    text-decoration: none;
    color: #4d3252;
    height: 40px;
    width: 55px;
    display: block;
    line-height: 45px;
  
    `
    const StyledPaginationNext = styled(Pagination.Next)`
    flex: 1;
    margin: 0px 5px;
    background: #dde1e7;
    border-radius: 3px;
    box-shadow: -3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288);
    font-size: 18px;
    text-decoration: none;
    color: #4d3252;
    height: 40px;
    width: 55px;
    display: block;
    line-height: 45px;
    
    `
export default PaginationComponent
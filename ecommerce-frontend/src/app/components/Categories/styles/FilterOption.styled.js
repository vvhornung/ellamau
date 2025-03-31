import styled from "styled-components";

export const FilterOption = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;

  &.destructive {
    color: crimson;
  }

  &.active {
    background-color: #f0f0f0;
    border-color: #bbb;
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  min-width: 200px;
  max-height: 300px;
  overflow-y: auto;
`;

export const FilterItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;

  &:hover {
    background-color: #f0f0f0;
  }

  &.selected {
    font-weight: bold;
    background-color: #e0e0e0;
  }
`;

export const FilterBadge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  padding: 0 0.5rem;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 400;
  
  .clear-badge {
    margin-left: 0.25rem;
    font-size: 0.7rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    color: crimson;
    transition: background-color 0.3s ease-in-out;
    
    &:hover {
      background-color: white;
    }
  }
`;
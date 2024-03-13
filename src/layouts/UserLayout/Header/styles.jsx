import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 99;
`

export const HeaderTopWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  background-color: darkcyan;
  color: white;
`

export const SearchContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  height: 100%;
  transform: translate(-50%, -50%);
`

export const HeaderBottomWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 44px;
  background-color: #006363;
`

export const NavLinkContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  height: 100%;
  transform: translate(-50%, -50%);
`

export const NavLinkItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  height: 100%;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkcyan;
    transition: all 0.3s;
  }
`

export const AvatarPreview = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`

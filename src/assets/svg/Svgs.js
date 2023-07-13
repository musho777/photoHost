import Svg, { Circle, Path } from "react-native-svg"

export const Eye = () =>{
    return <Svg
    width={21}
    height={18}
    viewBox="0 0 21 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M.642 11.122c.79 1.21 1.785 2.29 2.948 3.2l-2.449 2.291a.791.791 0 00-.246.576c.002.214.094.42.257.571a.906.906 0 00.61.24c.23.002.45-.08.616-.23l2.663-2.495a11.102 11.102 0 005.459 1.383c5.415 0 8.501-3.468 9.858-5.536.42-.634.642-1.366.642-2.112s-.222-1.478-.642-2.112a13.272 13.272 0 00-2.948-3.2l2.449-2.29a.818.818 0 00.196-.267.773.773 0 00.006-.632.817.817 0 00-.191-.27.882.882 0 00-.287-.178.928.928 0 00-.96.189l-2.67 2.498A11.101 11.101 0 0010.5 1.362c-5.415 0-8.501 3.468-9.858 5.536A3.827 3.827 0 000 9.01c0 .746.222 1.478.642 2.112zm18.226-3.367c.25.377.381.812.381 1.255 0 .444-.132.878-.381 1.255-1.167 1.773-3.804 4.756-8.368 4.756a9.325 9.325 0 01-4.169-.953l1.761-1.648a4.6 4.6 0 002.85.662 4.496 4.496 0 002.653-1.176 3.983 3.983 0 001.257-2.483c.1-.938-.15-1.88-.707-2.666l2.02-1.89a11.497 11.497 0 012.703 2.888zM7.876 9.01c0-.651.276-1.276.769-1.736a2.728 2.728 0 012.98-.474l-3.487 3.262a2.288 2.288 0 01-.262-1.052zm5.248 0c0 .651-.276 1.276-.769 1.736a2.729 2.729 0 01-2.98.474l3.487-3.262c.17.328.26.687.262 1.052zM2.132 7.755C3.299 5.982 5.936 2.999 10.5 2.999a9.327 9.327 0 014.169.953L12.908 5.6a4.601 4.601 0 00-2.85-.662 4.496 4.496 0 00-2.653 1.177 3.983 3.983 0 00-1.257 2.482c-.1.938.15 1.88.707 2.666l-2.02 1.89a11.496 11.496 0 01-2.703-2.888 2.275 2.275 0 01-.381-1.255c0-.443.132-.878.381-1.255z"
      fill="#8C9CAB"
    />
  </Svg>
}

export const BackArrow = () =>{
  return <Svg
  width={23}
  height={19}
  viewBox="0 0 23 19"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M22 9.273H1.636M9.273 1L1 9.273l8.273 8.273"
    stroke="#404040"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</Svg>
}
export const SearchInputSvg = () =>{
  return (
    <Svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M16.801 15.8l-4.224-4.224a7.09 7.09 0 10-1.001 1l4.225 4.225a.707.707 0 001-1zm-9.7-3.038A5.662 5.662 0 1112.761 7.1 5.669 5.669 0 017.1 12.762z"
      fill="#B1BAC3"
    />
  </Svg>
  )
}

export const ChatSeenSvg = ({seen}) =>{
  if(seen){
    return <Svg
      width={18}
      height={12}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 4.91L7.444 10 16 2"
        stroke="#FFC24B"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  }
  return <Svg
  width={18}
  height={12}
  viewBox="0 0 18 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M2 4.91L7.444 10 16 2"
    stroke="#D7E1EB"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</Svg>
}

export const OnlineSvg = () =>{
  return <Svg
  width={12}
  height={12}
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Circle
    cx={6}
    cy={6}
    r={5}
    fill="#75D779"
    stroke="#fff"
    strokeWidth={1.4}
  />
</Svg>
}
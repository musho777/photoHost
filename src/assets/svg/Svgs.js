import Svg, { Circle, Path, Rect } from "react-native-svg"

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

export const FotoSvg = () =>{
  return <Svg
  width={42}
  height={42}
  viewBox="0 0 42 42"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Rect width={42} height={42} rx={21} fill="#FFD953" />
  <Path
    d="M28 12h-.508l-2.184-2.832A3.024 3.024 0 0022.932 8h-3.864a3.023 3.023 0 00-2.376 1.168L14.508 12H14a5.006 5.006 0 00-5 5v10a5.006 5.006 0 005 5h14a5.006 5.006 0 005-5V17a5.006 5.006 0 00-5-5zm-9.724-1.61a1.007 1.007 0 01.792-.39h3.864a1.008 1.008 0 01.792.39L24.966 12h-7.932l1.242-1.61zM31 27a3 3 0 01-3 3H14a3 3 0 01-3-3V17a3 3 0 013-3h14a3 3 0 013 3v10z"
    fill="#fff"
  />
  <Path
    d="M21 16a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z"
    fill="#fff"
  />
</Svg>
}

export const VoiceSvg = () =>{
  return <Svg
  width={24}
  height={24}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M12 20a8.009 8.009 0 008-8V8A8 8 0 004 8v4a8.009 8.009 0 008 8zm0-18a6.006 6.006 0 015.91 5H15a1 1 0 100 2h3v2h-3a1 1 0 000 2h2.91a5.993 5.993 0 01-11.82 0H9a1 1 0 000-2H6V9h3a1 1 0 000-2H6.09A6.006 6.006 0 0112 2z"
    fill="#4D4D4D"
  />
  <Path
    d="M23 12a1 1 0 00-1 1 9.01 9.01 0 01-9 9h-2a9.011 9.011 0 01-9-9 1 1 0 10-2 0 11.013 11.013 0 0011 11h2a11.013 11.013 0 0011-11 1 1 0 00-1-1z"
    fill="#4D4D4D"
  />
</Svg>
}

export const SendImgSvg = () =>{
  return <Svg
  width={24}
  height={24}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M19 0H5a5.006 5.006 0 00-5 5v14a5.006 5.006 0 005 5h14a5.006 5.006 0 005-5V5a5.006 5.006 0 00-5-5zM5 2h14a3 3 0 013 3v14a2.95 2.95 0 01-.3 1.285l-9.163-9.163a5.001 5.001 0 00-7.072 0L2 14.586V5a3 3 0 013-3zm0 20a3 3 0 01-3-3v-1.586l4.878-4.878a3 3 0 014.244 0l9.163 9.164c-.4.196-.84.298-1.285.3H5z"
    fill="#444"
  />
  <Path
    d="M16 10.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
    fill="#444"
  />
</Svg>
}

export const MenuSvg2 = () =>{
  return <Svg
  width={32}
  height={12}
  viewBox="0 0 32 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path stroke="#444" strokeWidth={2} strokeLinecap="round" d="M1 1L31 1" />
  <Path
    stroke="#444"
    strokeWidth={2}
    strokeLinecap="round"
    d="M1 11L19.4074 11"
  />
</Svg>
}
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

export const EditAvaterSvg = () =>{
  return <Svg
  width={28}
  height={28}
  viewBox="0 0 28 28"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Rect
    x={0.5}
    y={0.5}
    width={27}
    height={27}
    rx={13.5}
    fill="#D4DEE7"
    stroke="#fff"
  />
  <Path
    d="M18.083 8.667h-.296l-1.274-1.652a1.764 1.764 0 00-1.386-.682h-2.254a1.764 1.764 0 00-1.386.682l-1.274 1.652h-.296A2.92 2.92 0 007 11.583v5.834a2.92 2.92 0 002.917 2.916h8.166A2.92 2.92 0 0021 17.417v-5.834a2.92 2.92 0 00-2.917-2.916zm-5.672-.94a.587.587 0 01.462-.227h2.254a.588.588 0 01.462.228l.725.939h-4.627l.724-.94zm7.422 9.69a1.75 1.75 0 01-1.75 1.75H9.917a1.75 1.75 0 01-1.75-1.75v-5.834a1.75 1.75 0 011.75-1.75h8.166a1.75 1.75 0 011.75 1.75v5.834z"
    fill="#fff"
  />
  <Path
    d="M14 11a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 5.833a2.334 2.334 0 110-4.667 2.334 2.334 0 010 4.667z"
    fill="#fff"
  />
</Svg>
}

export const CheckMarkSvg = () =>{
  return <Svg
  width={26}
  height={19}
  viewBox="0 0 26 19"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M2 9l7.5 7.5L24 2"
    stroke="#FFC24B"
    strokeWidth={2.2}
    strokeLinecap="round"
  />
</Svg>
}

export const ArrowSvg = () =>{
  return <Svg
  width={11}
  height={19}
  viewBox="0 0 11 19"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M1 1l8.273 8.273L1 17.546"
    stroke="#404040"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</Svg>
}

export const CommentLikeSvg = ({liked}) =>{
  if(liked){
    return <Svg
    width={12}
    height={11}
    style = {{marginHorizontal:10,marginVertical:10}}
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8.749 0a3.1 3.1 0 00-1.596.475C6.67.777 6.273 1.207 6 1.721A3.278 3.278 0 004.847.475 3.1 3.1 0 003.251 0C2.354.04 1.51.45.9 1.139a3.636 3.636 0 00-.898 2.537c0 2.371 2.392 4.96 4.399 6.716A2.425 2.425 0 006 11c.585 0 1.151-.215 1.6-.608 2.006-1.756 4.398-4.345 4.398-6.716A3.637 3.637 0 0011.1 1.14 3.342 3.342 0 008.75 0z"
      fill="#FF5656"
    />
  </Svg>
  }
  else {
    return <Svg
      width={12}
      height={11}
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style = {{marginHorizontal:10,marginVertical:10}}
    >
      <Path
        d="M5.558 1.955a.5.5 0 00.884 0c.232-.438.57-.802.976-1.056A2.601 2.601 0 018.742.5a2.842 2.842 0 011.983.97 3.137 3.137 0 01.773 2.206c0 1.028-.525 2.162-1.351 3.294-.818 1.121-1.888 2.18-2.877 3.046h0A1.925 1.925 0 016 10.5c-.461 0-.911-.17-1.27-.484h0C3.74 9.15 2.67 8.09 1.853 6.97 1.027 5.838.503 4.704.503 3.676a3.136 3.136 0 01.772-2.206A2.842 2.842 0 013.258.5c.466.01.922.147 1.324.399.406.254.744.618.976 1.056z"
        stroke="#8C9CAB"
        strokeLinejoin="round"
      />
    </Svg>
  }
}

export const SendSvg = () =>{
  return <Svg
  width={26}
  height={24}
  viewBox="0 0 26 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M1.417.09A1 1 0 00.035 1.264L2.964 12 .035 22.737a1 1 0 001.382 1.172l23.986-10.994a1.003 1.003 0 00.553-1.21.998.998 0 00-.553-.62L1.417.09zM20.418 11L2.528 2.8 4.764 11h15.654zM4.764 13h15.654l-17.89 8.2L4.764 13z"
    fill="#8C9CAB"
  />
</Svg>
}
export const SendMsgSvg = () =>{
  return <Svg
  width={26}
  height={24}
  viewBox="0 0 26 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M1.417.09A1 1 0 00.035 1.264L2.964 12 .035 22.737a1 1 0 001.382 1.172l23.986-10.994a1.003 1.003 0 00.553-1.21.998.998 0 00-.553-.62L1.417.09zM20.418 11L2.528 2.8 4.764 11h15.654zM4.764 13h15.654l-17.89 8.2L4.764 13z"
    fill="#444"
  />
</Svg>
}

export const CloseSvg = () =>{
  return <Svg
  width={17}
  height={17}
  viewBox="0 0 17 17"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M16 1L1 16M1 1l15 15"
    stroke="#404040"
    strokeWidth={1.8}
    strokeLinecap="round"
  />
</Svg>
}

export const ImgArrow = () =>{
  return <Svg
  width={23}
  height={19}
  viewBox="0 0 23 19"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    d="M1 9.273h20.364M13.727 1L22 9.273l-8.273 8.273"
    stroke="#404040"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</Svg>
}

export const NotLineSvg = () =>{
  return <Svg
  width={26}
  height={23}
  viewBox="0 0 26 23"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M16.465 21.729c4.347-3.671 9.53-9.085 9.53-14.043a7.443 7.443 0 00-1.945-5.305A7.343 7.343 0 0018.956 0a6.895 6.895 0 00-4.651 1.904A6.97 6.97 0 0013 3.598 6.97 6.97 0 0010.502.994 6.896 6.896 0 007.044 0 7.343 7.343 0 001.95 2.381 7.443 7.443 0 00.005 7.686c0 4.958 5.183 10.372 9.53 14.043A5.364 5.364 0 0013 23c1.268 0 2.495-.45 3.465-1.271zM7.072 2c.844.023 1.67.266 2.396.704a4.957 4.957 0 011.78 1.856 2 2 0 003.505 0 4.957 4.957 0 011.78-1.856 4.896 4.896 0 012.395-.704 5.343 5.343 0 013.647 1.731 5.443 5.443 0 011.42 3.954c0 1.825-.981 3.985-2.73 6.298-1.714 2.266-3.973 4.429-6.09 6.217h-.002c-.61.517-1.38.799-2.173.799a3.365 3.365 0 01-2.174-.798V20.2c-2.118-1.788-4.377-3.951-6.09-6.217-1.75-2.313-2.73-4.473-2.73-6.298l-.002-.075a5.443 5.443 0 011.42-3.879 5.343 5.343 0 013.648-1.731z"
    fill="#444"
  />
</Svg>
} 

export const  CheckMarkUserSvg =() =>{
  return <Svg
      width={13}
      height={14}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.06.3a2 2 0 00-2.11 0L3.039 1.488 1.056 2.55A2 2 0 00.001 4.376l.072 2.249-.072 2.248A2 2 0 001.056 10.7l1.983 1.062 1.911 1.186a2 2 0 002.11 0l1.91-1.186 1.984-1.062a2 2 0 001.055-1.827l-.072-2.248.072-2.249a2 2 0 00-1.055-1.827L8.97 1.487 7.06.301zm2.3 5.038a.64.64 0 10-.894-.916L5.314 7.495 3.523 5.898a.64.64 0 10-.852.955l2.682 2.39L9.36 5.339z"
        fill="#FFC24B"
      />
    </Svg>
}

export const HearSvg2 = () =>{
  return <Svg
  width={18}
  height={15}
  viewBox="0 0 18 15"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <Path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M17.996 5.013c0 3.233-3.588 6.764-6.597 9.158A3.853 3.853 0 019 15a3.853 3.853 0 01-2.399-.83C3.591 11.778.004 8.247.004 5.014a4.693 4.693 0 011.346-3.46A5.218 5.218 0 014.877 0c.844.012 1.67.236 2.394.648.298.17.575.37.826.594.358.32.663.693.903 1.104.24-.411.545-.784.903-1.104.251-.225.528-.424.826-.594A4.994 4.994 0 0113.123 0a5.219 5.219 0 013.527 1.553 4.692 4.692 0 011.346 3.46z"
    fill="#FF5656"
  />
</Svg>
}
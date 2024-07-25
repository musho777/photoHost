import Svg, { Circle, Defs, G, Image, Path, Pattern, Rect, Use } from "react-native-svg"

export const Eye = () => {
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

export const BackArrow = () => {
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
export const SearchInputSvg = () => {
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

export const ChatSeenSvg = ({ seen }) => {
  if (seen) {
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

export const OnlineSvg = () => {
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

export const FotoSvg = () => {
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

export const VoiceSvg = () => {
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

export const SendImgSvg = () => {
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

export const MenuSvg2 = () => {
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

export const EditAvaterSvg = () => {
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

export const CheckMarkSvg = () => {
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

export const ArrowSvg = () => {
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

export const CommentLikeSvg = ({ liked }) => {
  if (liked) {
    return <Svg
      width={12}
      height={11}
      style={{ marginHorizontal: 10, marginVertical: 10 }}
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
      style={{ marginHorizontal: 10, marginVertical: 10 }}
    >
      <Path
        d="M5.558 1.955a.5.5 0 00.884 0c.232-.438.57-.802.976-1.056A2.601 2.601 0 018.742.5a2.842 2.842 0 011.983.97 3.137 3.137 0 01.773 2.206c0 1.028-.525 2.162-1.351 3.294-.818 1.121-1.888 2.18-2.877 3.046h0A1.925 1.925 0 016 10.5c-.461 0-.911-.17-1.27-.484h0C3.74 9.15 2.67 8.09 1.853 6.97 1.027 5.838.503 4.704.503 3.676a3.136 3.136 0 01.772-2.206A2.842 2.842 0 013.258.5c.466.01.922.147 1.324.399.406.254.744.618.976 1.056z"
        stroke="#8C9CAB"
        strokeLinejoin="round"
      />
    </Svg>
  }
}

export const SendSvg = () => {
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
export const SendMsgSvg = () => {
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

export const CloseSvg = () => {
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

export const ImgArrow = () => {
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

export const NotLineSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M20.975 12.185l-.739-.128.74.128zm-.705 4.08l-.74-.128.74.128zM6.938 20.477l-.747.065.747-.065zm-.812-9.393l.747-.064-.747.064zm7.869-5.863l.74.122-.74-.122zm-.663 4.045l.74.121-.74-.121zm-6.634.411l-.49-.568.49.568zm1.439-1.24l.49.569-.49-.568zm2.381-3.653l-.726-.189.726.189zm.476-1.834l.726.188-.726-.188zm1.674-.886l-.23.714.23-.714zm.145.047l.229-.714-.23.714zM9.862 6.463l.662.353-.662-.353zm4.043-3.215l-.726.188.726-.188zm-2.23-1.116l-.326-.675.325.675zm8.561 9.925l-.705 4.08 1.478.256.705-4.08-1.478-.256zm-6.991 9.193H8.596v1.5h4.649v-1.5zm-5.56-.837l-.812-9.393-1.495.129.813 9.393 1.494-.13zm11.846-4.276c-.507 2.93-3.15 5.113-6.286 5.113v1.5c3.826 0 7.126-2.669 7.764-6.357l-1.478-.256zM13.255 5.1l-.663 4.045 1.48.242.663-4.044-1.48-.243zm-6.067 5.146l1.438-1.24-.979-1.136L6.21 9.11l.979 1.136zm4.056-5.274l.476-1.834-1.452-.376-.476 1.833 1.452.377zm1.194-2.194l.145.047.459-1.428-.145-.047-.459 1.428zm-1.915 4.038a8.378 8.378 0 00.721-1.844l-1.452-.377A6.878 6.878 0 019.2 6.11l1.324.707zm2.06-3.991a.885.885 0 01.596.61l1.452-.376a2.384 2.384 0 00-1.59-1.662l-.458 1.428zm-.863.313a.514.514 0 01.28-.33l-.651-1.351c-.532.256-.932.73-1.081 1.305l1.452.376zm.28-.33a.596.596 0 01.438-.03l.459-1.428a2.096 2.096 0 00-1.548.107l.65 1.351zm2.154 8.176h5.18v-1.5h-5.18v1.5zm.581-5.641a5.533 5.533 0 00-.104-2.284l-1.452.377a4.03 4.03 0 01.076 1.664l1.48.243zM8.596 21.25a.916.916 0 01-.911-.837l-1.494.129a2.416 2.416 0 002.405 2.208v-1.5zm.03-12.244c.68-.586 1.413-1.283 1.898-2.19L9.2 6.109c-.346.649-.898 1.196-1.553 1.76l.98 1.137zm13.088 3.307a2.416 2.416 0 00-2.38-2.829v1.5c.567 0 1 .512.902 1.073l1.478.256zm-9.122-3.168a1.583 1.583 0 001.562 1.84v-1.5a.083.083 0 01-.082-.098l-1.48-.242zm-5.72 1.875a.918.918 0 01.316-.774l-.98-1.137a2.418 2.418 0 00-.83 2.04l1.495-.13z"
      fill="#1C274C"
    />
    <Path
      opacity={0.5}
      d="M3.972 21.47l-.748.066.748-.065zM3 10.235l.747-.064a.75.75 0 00-1.497.064H3zm1.719 11.172L3.747 10.17l-1.494.129.971 11.236 1.495-.129zm-.969.107V10.234h-1.5v11.279h1.5zm-.526.022a.263.263 0 01.263-.285v1.5c.726 0 1.294-.622 1.232-1.344l-1.495.13zm.263-.285c.146 0 .263.119.263.263h-1.5c0 .682.553 1.237 1.237 1.237v-1.5z"
      fill="#1C274C"
    />
  </Svg>
}

export const CheckMarkUserSvg = () => {
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

export const HearSvg2 = () => {
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

export const LocationSvg = () => {
  return <Svg
    width={12}
    height={15}
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6 0a5.875 5.875 0 00-4.24 1.841A6.437 6.437 0 000 6.28c0 3.317 5.04 7.87 5.612 8.378L6 15l.388-.343C6.96 14.15 12 9.596 12 6.28a6.437 6.437 0 00-1.76-4.438A5.875 5.875 0 006 0zm0 9.419a2.906 2.906 0 01-1.667-.53A3.113 3.113 0 013.228 7.48a3.275 3.275 0 01-.17-1.813 3.187 3.187 0 01.82-1.608c.42-.439.955-.738 1.537-.86a2.876 2.876 0 011.733.18c.548.237 1.017.64 1.346 1.156.33.516.506 1.123.506 1.744 0 .832-.317 1.63-.88 2.219a2.938 2.938 0 01-2.12.92z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const ProfetionsSvg = () => {
  return <Svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.86 8.465v1.209H6.65v-1.21H0v5.593h14.51V8.465H7.86zM14.51 7.255V4.232a1.814 1.814 0 00-1.813-1.814h-1.814V1.21A1.21 1.21 0 009.673 0H4.838a1.21 1.21 0 00-1.21 1.21v1.208H1.815A1.814 1.814 0 000 4.232v3.023h14.51zM4.838 1.21h4.837v1.21H4.837v-1.21z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const WorkLocation = () => {
  return <Svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.558 7.258c.245-.449.548-.866.905-1.24a5.543 5.543 0 014-1.73h.002a5.498 5.498 0 013.05.933v-.987a1.814 1.814 0 00-1.814-1.815h-1.814V1.21A1.21 1.21 0 009.677 0H4.84a1.21 1.21 0 00-1.21 1.21v1.21H1.814A1.814 1.814 0 000 4.233v3.024h6.558zm3.12-6.048h-4.84v1.21h4.84V1.21zM6.062 8.467a6.045 6.045 0 00-.235 1.662c0 .886.33 1.758.732 2.51.162.302.342.599.535.887H0V8.467h6.063zm4.77 2.732c.192.134.41.202.63.202.294 0 .586-.123.81-.356a1.33 1.33 0 00.36-.916c0-.262-.075-.514-.21-.724a1.193 1.193 0 00-.528-.456 1.077 1.077 0 00-.65-.068 1.14 1.14 0 00-.59.333 1.306 1.306 0 00-.335.659c-.049.256-.023.52.071.759.094.238.25.433.443.567zM8.259 6.78a4.444 4.444 0 013.206-1.39 4.444 4.444 0 013.206 1.39 4.857 4.857 0 011.33 3.35c0 2.505-3.81 5.943-4.243 6.327l-.293.26-.293-.26c-.433-.384-4.243-3.822-4.243-6.326a4.858 4.858 0 011.33-3.351zm1.946 5.322c.373.26.811.4 1.26.4.601-.001 1.178-.251 1.603-.696a2.429 2.429 0 00.665-1.675c0-.469-.133-.927-.382-1.317a2.292 2.292 0 00-1.018-.873 2.177 2.177 0 00-1.31-.135 2.24 2.24 0 00-1.162.649 2.406 2.406 0 00-.62 1.213 2.47 2.47 0 00.128 1.37c.172.433.463.803.836 1.064z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const NetWorkSvg = () => {
  return <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8 0a8 8 0 108 8 8.009 8.009 0 00-8-8zm5.765 4.667h-2.148a13.118 13.118 0 00-1.88-3.096 6.688 6.688 0 014.028 3.096zM11 8a6.808 6.808 0 01-.317 2H5.317A6.808 6.808 0 015 8a6.808 6.808 0 01.317-2h5.366c.205.647.312 1.321.317 2zm-5.148 3.333h4.296A13.074 13.074 0 018 14.392a13.047 13.047 0 01-2.148-3.059zm0-6.666A13.076 13.076 0 018 1.608c.86.911 1.583 1.941 2.148 3.059H5.852zm.415-3.096a13.117 13.117 0 00-1.884 3.096H2.235A6.687 6.687 0 016.267 1.57zM1.64 6h2.292a8.01 8.01 0 00-.266 2 8.01 8.01 0 00.266 2H1.641a6.661 6.661 0 010-4zm.594 5.333h2.148a13.116 13.116 0 001.884 3.096 6.687 6.687 0 01-4.032-3.096zm7.502 3.096c.767-.94 1.4-1.982 1.88-3.096h2.148a6.687 6.687 0 01-4.028 3.096zM14.359 10h-2.292a8.01 8.01 0 00.266-2 8.01 8.01 0 00-.266-2h2.291a6.66 6.66 0 010 4h.001z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const EmailSvg = () => {
  return <Svg
    width={15}
    height={13}
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M5.973 6.98a1.818 1.818 0 002.566 0l5.84-5.84A1.815 1.815 0 0012.697 0H1.814A1.814 1.814 0 00.133 1.14l5.84 5.84z"
      fill="#CCD6DF"
    />
    <Path
      d="M9.393 7.836a3.027 3.027 0 01-4.276 0L0 2.72v9.702h14.51V2.721L9.394 7.836z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const PhoneSvg = () => {
  return <Svg
    width={14}
    height={15}
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M14 3.903C14 8.677 8.092 15 3.642 15a3.464 3.464 0 01-2.555-1.112l-.583-.719c-.677-.725-.677-1.95.029-2.705.017-.019 1.423-1.175 1.423-1.175a1.725 1.725 0 012.496 0l.852.731c1.866-.85 3.19-2.274 4.042-4.342l-.677-.912a2.028 2.028 0 010-2.674S9.75.586 9.766.567a1.722 1.722 0 012.554 0l.613.569c.7.743 1.067 1.718 1.067 2.761v.006z"
      fill="#CCD6DF"
    />
  </Svg>
}
export const DownArrow = () => {
  return <Svg
    width={16}
    height={10}
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1 1l7 7 7-7"
      stroke="#444"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
}
export const DownArrow1 = () => {
  return <Svg
    width={16}
    height={7}
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1 1l7 7 7-7"
      stroke="#444"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
}

export const CakeSvg = () => {
  return <Svg
    width={16}
    height={15}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.333 8.13v-.624c0-.497.211-.973.586-1.325a2.07 2.07 0 011.414-.549h4V4.27a1.992 1.992 0 01-.964-.682A1.794 1.794 0 016 2.51C6 1.594 7.209.603 7.58.32L8 0l.42.32C8.792.603 10 1.594 10 2.51c-.002.386-.13.762-.37 1.077a1.992 1.992 0 01-.963.682v1.363h4c.53 0 1.039.198 1.414.55.375.35.586.827.586 1.324v.624c0 .215-.455.625-1.167.625-.726 0-1.167-.433-1.167-.625H11c0 .215-.455.625-1.167.625-.726 0-1.166-.433-1.166-.625H7.333c0 .215-.454.625-1.166.625C5.44 8.755 5 8.322 5 8.13H3.667c0 .215-.455.625-1.167.625-.726 0-1.167-.433-1.167-.625zM0 13.751V15h16v-1.249H0zM14.667 9.77a3.075 3.075 0 01-1.167.234 2.912 2.912 0 01-1.833-.625 2.992 2.992 0 01-1.832.624A2.994 2.994 0 018 9.39a2.994 2.994 0 01-1.835.614 2.992 2.992 0 01-1.832-.624 2.912 2.912 0 01-1.833.625 3.075 3.075 0 01-1.167-.234v2.732h13.334V9.77z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const GenderSvg = () => {
  return <Svg
    width={17}
    height={18}
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.061 13.49h-1.42v-1.644a6.363 6.363 0 01.152-9.63 4.98 4.98 0 00-.862-.084 4.97 4.97 0 00-.71 9.882v1.477h-1.42a.71.71 0 100 1.42h1.42v1.42a.71.71 0 101.42 0v-1.42h1.42a.71.71 0 000-1.42z"
      fill="#CCD6DF"
    />
    <Path
      d="M15.58.002h-2.84a.71.71 0 100 1.42h1.836l-1.704 1.704a4.99 4.99 0 101.004 1.005l1.704-1.704v1.835a.71.71 0 001.42 0v-2.84a1.42 1.42 0 00-1.42-1.42z"
      fill="#CCD6DF"
    />
  </Svg>
}

export const SaveSVG = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width={16}
    height={16}
    viewBox="0,0,256,256"
    fill="#000"
  >
    <G
      fill="none"
      strokeMiterlimit={10}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{
        mixBlendMode: "normal"
      }}
    >
      <Path
        d="M20 31.441l-11.5 5.75V2.5h23v34.691z"
        fill="#fff437"
        transform="scale(6.4)"
      />
      <Path
        d="M31 3v33.382l-10.553-5.276-.447-.224-.447.224L9 36.382V3h22m1-1H8v36l12-6 12 6V2z"
        fill="#c74343"
        transform="scale(6.4)"
      />
    </G>
  </Svg>
}

export const ChecboxUNchekedSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
  >
    <Path
      d="M5.75 3h12.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75A2.75 2.75 0 015.75 3zm0 1.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H5.75z"
      fill="#FFD953"
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
    />
  </Svg>
}

export const CheckedChexbox = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFD953"
    width="30px"
    height="30px"
    viewBox="0 0 32 32"
    id="icon"
  >
    <G id="SVGRepo_iconCarrier">
      <Path d="M26 4H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zM6 26V6h20v20z" />
      <Path d="M14 21.5L9 16.54 10.59 15 14 18.35 21.41 11 23 12.58 14 21.5z" />
      <Path
        id="_Transparent_Rectangle_"
        data-name="&lt;Transparent Rectangle&gt;"
        d="M0 0H32V32H0z"
        fill="none"
      />
    </G>
  </Svg>
}

export const EmojiIcon = () => {
  return <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <Path d="M12 1a11 11 0 1011 11A11.013 11.013 0 0012 1zm0 20a9 9 0 119-9 9.011 9.011 0 01-9 9zm6-8a6 6 0 01-12 0 1 1 0 012 0 4 4 0 008 0 1 1 0 012 0zM8 10V9a1 1 0 012 0v1a1 1 0 01-2 0zm6 0V9a1 1 0 012 0v1a1 1 0 01-2 0z" />
  </Svg>
}

export const LikeSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000"
    height="800px"
    width="800px"
    viewBox="0 0 486.926 486.926"
    xmlSpace="preserve"
  >
    <Path d="M462.8 181.564c-12.3-10.5-27.7-16.2-43.3-16.2H314.4v-75.9c0-31.9-9.3-54.9-27.7-68.4-29.1-21.4-69.2-9.2-70.9-8.6-5 1.6-8.4 6.2-8.4 11.4v84.9c0 27.7-13.2 51.2-39.3 69.9-19.5 14-39.4 20.1-41.5 20.8l-2.9.7c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6 0-24.7 11.1-24.7 24.7v228.4c0 13.6 11.1 24.7 24.7 24.7h77.9c7.6 0 14.5-3.5 19-8.9 12.5 13.3 30.2 21.6 49.4 21.6h207.8c45.9 0 75.2-24 80.4-66l26.9-166.9c3.7-24-5.2-48.6-23.3-64zm-359.6 259.5c0 .4-.3.7-.7.7H24.7c-.4 0-.7-.3-.7-.7v-228.4c0-.4.3-.7.7-.7h77.9c.4 0 .7.3.7.7v228.4h-.1zm359-199.3l-26.8 167.2c0 .1 0 .3-.1.5-3.7 29.9-22.7 45.1-56.6 45.1H170.9c-21.3 0-39.8-15.9-43.1-36.9-.1-.7-.3-1.4-.5-2.1v-191.6l5.2-1.2c.2 0 .3-.1.5-.1 1-.3 24.7-7 48.6-24 32.7-23.2 49.9-54.3 49.9-89.9v-75.3c10.4-1.7 28.2-2.6 41.1 7 11.8 8.7 17.8 25.2 17.8 49v87.8c0 6.6 5.4 12 12 12h117.1c9.9 0 19.8 3.7 27.7 10.5 11.8 10.1 17.6 26.2 15 42z" />
  </Svg>
}

export const PauseSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    height="40px"
    width="40px"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <Path d="M256 0C114.617 0 0 114.615 0 256s114.617 256 256 256 256-114.615 256-256S397.383 0 256 0zm-32 320c0 8.836-7.164 16-16 16h-32c-8.836 0-16-7.164-16-16V192c0-8.836 7.164-16 16-16h32c8.836 0 16 7.164 16 16v128zm128 0c0 8.836-7.164 16-16 16h-32c-8.836 0-16-7.164-16-16V192c0-8.836 7.164-16 16-16h32c8.836 0 16 7.164 16 16v128z" />
  </Svg>
}

export const StartSvg2 = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M21.409 9.353a2.998 2.998 0 010 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968z"
      fill="white"
    />
  </Svg>
}


export const SelectSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
  >
    <Circle cx={7} cy={7} r={7} fill="#fff" />
  </Svg>
}

export const SelectedSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
  >
    <Circle cx={7} cy={7} r={7} fill="#fff" />
    <Circle cx={7} cy={7} r={5} fill="#FFD953" />
  </Svg>
}

export const MusicSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    width="15px"
    height="15px"
    viewBox="0 0 31.216 31.216"
    xmlSpace="preserve"
    stroke="#fff"
  >
    <Path d="M30.854 0L11.057 2.837v18.034c-1.089-.596-2.405-.94-3.838-.94-3.845 0-6.856 2.479-6.856 5.642 0 3.164 3.012 5.644 6.856 5.644s6.856-2.479 6.856-5.644l-.019-13.353 13.797-2.213v8.487c-1.1-.613-2.434-.971-3.891-.971-3.844 0-6.855 2.479-6.855 5.642 0 3.165 3.012 5.644 6.855 5.644 3.686 0 6.598-2.279 6.832-5.255.035-.126.06-23.554.06-23.554zM7.218 28.215c-2.13 0-3.856-1.184-3.856-2.643s1.727-2.643 3.856-2.643c2.066 0 3.74 1.116 3.838 2.516v.127c0 .025.006.049.008.074-.06 1.424-1.753 2.569-3.846 2.569zM14.057 9.18V5.438L27.854 3.46v3.507L14.057 9.18zm9.907 16.629c-2.129 0-3.856-1.184-3.856-2.645 0-1.459 1.728-2.641 3.856-2.641s3.854 1.182 3.854 2.641c0 1.462-1.725 2.645-3.854 2.645z" />
  </Svg>
}

export const SuccessSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    width="20px"
    height="20px"
    viewBox="-1.7 0 20.4 20.4"
    className="cf-icon-svg"
    stroke="#fff"
  >
    <Path d="M16.417 10.283A7.917 7.917 0 118.5 2.366a7.916 7.916 0 017.917 7.917zm-4.105-4.498a.791.791 0 00-1.082.29l-3.828 6.63-1.733-2.08a.791.791 0 10-1.216 1.014l2.459 2.952a.792.792 0 00.608.285.83.83 0 00.068-.003.791.791 0 00.618-.393L12.6 6.866a.791.791 0 00-.29-1.081z" />
  </Svg>
}

export const ClearSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width="30px"
    height="30px"
  >
    <Path d="M15 3C8.373 3 3 8.373 3 15s5.373 12 12 12 12-5.373 12-12S21.627 3 15 3zm1.414 12l3.293 3.293a.999.999 0 11-1.414 1.414L15 16.414l-3.293 3.293a.999.999 0 11-1.414-1.414L13.586 15l-3.293-3.293a.999.999 0 111.414-1.414L15 13.586l3.293-3.293a.999.999 0 111.414 1.414L16.414 15z" />
  </Svg>
}

export const Sticker = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={30}
    viewBox="0 0 20 20"
    width={30}
  >
    <Path
      d="M15.111 2c1.54 0 2.8 1.206 2.884 2.725l.005.164v6.041c0 .53-.19 1.042-.531 1.442l-.12.13-4.847 4.847c-.375.375-.87.602-1.396.644L10.93 18H4.89c-1.54 0-2.8-1.206-2.884-2.725L2 15.111V4.89c0-1.54 1.206-2.8 2.725-2.884L4.889 2zm-.08 1H4.97c-1.042 0-1.895.81-1.964 1.834L3 4.969V15.03c0 1.042.81 1.895 1.834 1.964l.135.005h6.029v-3.092a5.423 5.423 0 01-4.853-1.515.5.5 0 01.71-.704 4.426 4.426 0 004.18 1.189c.006-.059.013-.109.02-.154.384-1.032 1.352-1.655 2.502-1.72L13.72 11H17V4.969c0-1.042-.81-1.895-1.834-1.964zm1.554 9h-2.762c-.965 0-1.755.75-1.819 1.698l-.004.125v2.761l.087-.078 4.419-4.42c.028-.027.054-.056.079-.086zM7 7a1 1 0 110 2 1 1 0 010-2zm6 0a1 1 0 110 2 1 1 0 010-2z"
      fill="#212121"
    />
  </Svg>
}

export const Emojy = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 122.88 122.88"
    width={30}
    height={30}
  >
    <Path
      d="M45.54 2.11A61.42 61.42 0 112.11 77.34 61.42 61.42 0 0145.54 2.11z"
      fillRule="evenodd"
      fill="#fbd433"
    />
    <Path
      d="M45.78 32.27c4.3 0 7.79 5 7.79 11.27s-3.49 11.27-7.79 11.27S38 49.77 38 43.54s3.48-11.27 7.78-11.27zM77.1 32.27c4.3 0 7.78 5 7.78 11.27S81.4 54.81 77.1 54.81s-7.79-5-7.79-11.27 3.49-11.27 7.79-11.27z"
      fill="#141518"
      fillRule="evenodd"
    />
    <Path
      d="M28.8 70.82a39.65 39.65 0 008.83 8.41 42.72 42.72 0 0025 7.53 40.44 40.44 0 0024.12-8.12 35.75 35.75 0 007.49-7.87.22.22 0 01.31 0L97 73.14a.21.21 0 010 .29 45.87 45.87 0 01-14.11 15.15A37.67 37.67 0 0162.83 95a39 39 0 01-20.68-5.55A50.52 50.52 0 0125.9 73.57a.23.23 0 010-.28l2.52-2.5a.22.22 0 01.32 0z"
      fill="black"
    />
  </Svg>
}

export const StickerSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={40}
    height={40}
    fill="none"

  >
    <Path fill="none" d="M0 0H256V256H0z" />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={15}
      d="M136 216H88a48 48 0 01-48-48V88a48 48 0 0148-48h80a48 48 0 0148 48v48c-8 24-56 72-80 80z"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={15}
      d="M136 216v-32a48 48 0 0148-48h32"
    />
  </Svg>
}

export const StickerSvg1 = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={40}
    height={40}
    fill="none"

  >
    <Path fill="none" d="M0 0H256V256H0z" />
    <Path
      fill="none"
      stroke="#FFD953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={15}
      d="M136 216H88a48 48 0 01-48-48V88a48 48 0 0148-48h80a48 48 0 0148 48v48c-8 24-56 72-80 80z"
    />
    <Path
      fill="none"
      stroke="#FFD953"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={15}
      d="M136 216v-32a48 48 0 0148-48h32"
    />
  </Svg>
}

export const GifSvg = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#000"
      strokeLinejoin="round"
      d="M2 6a4 4 0 014-4h12a4 4 0 014 4v12a4 4 0 01-4 4H6a4 4 0 01-4-4V6z"
      strokeWidth={1.5}

    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v8m3 0v-4m4-4h-3.5a.5.5 0 00-.5.5V12m0 0h3M9 8H7.5A2.5 2.5 0 005 10.5v3.278C5 15.005 5.995 16 7.222 16v0C8.204 16 9 15.204 9 14.222V12.5a.5.5 0 00-.5-.5h-1"
      strokeWidth={1.5}
    />
  </Svg>
}

export const GifSvg1 = () => {
  return <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#FFD953"
      strokeLinejoin="round"
      d="M2 6a4 4 0 014-4h12a4 4 0 014 4v12a4 4 0 01-4 4H6a4 4 0 01-4-4V6z"
      strokeWidth={1.5}

    />
    <Path
      stroke="#FFD953"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v8m3 0v-4m4-4h-3.5a.5.5 0 00-.5.5V12m0 0h3M9 8H7.5A2.5 2.5 0 005 10.5v3.278C5 15.005 5.995 16 7.222 16v0C8.204 16 9 15.204 9 14.222V12.5a.5.5 0 00-.5-.5h-1"
      strokeWidth={1.5}
    />
  </Svg>
}

export const StatisticSvg = ({ active }) => {
  if (active) {
    return <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Path fill="url(#pattern0_5_2)" d="M0 0H25V25H0z" />
      <Defs>
        <Pattern
          id="pattern0_5_2"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_5_2" transform="scale(.00195)" />
        </Pattern>
        <Image
          id="image0_5_2"
          width={512}
          height={512}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  }
  return <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <Path fill="url(#pattern0_5_3)" d="M0 0H25V25H0z" />
    <Defs>
      <Pattern
        id="pattern0_5_3"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_5_3" transform="scale(.00195)" />
      </Pattern>
      <Image
        id="image0_5_3"
        width={512}
        height={512}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d13nF1Vuf/x79r7lCmZTAiEHlpmaJEmIFUEwQKYIkoAEUFU+N3LxQJeC9er8dorKpZLh4CAQSVFclHp0kRAOiSTECAhECA9U845e+/1+yMJBpgkM3PWOm1/3q9XXobJmWc9gZjne9ZeZ28jAABSZKcrbdPyOP5YnOiEONHYOLGj4sQ2WyOTJDKhkQ0CExujvjCwi7NB8EhodOPSheFNmmyiavfviql2AwAAVEL7ZdGn4yj5Qm+kPRI7+PkXBkqas/pnTsF3lpyVuclHj5VEAAAANLThl8b/XYiSLxYjO9xVzaaMWdrcZL6y9JOZS13VrDQCAACgIbVfUXpvsaAb+iI7ytcaLblgYWtTePyrp5vHfa3hS1DtBgAAcK3t0ujiVT3JbT6Hv5HUlNP2bXn7tzE32JN9reMLOwAAgIax7cW2ZbkpPdZbUIfPdTKB0VbDA+Wz/xqj1tgLn3sm+KImm8Tn2q4QAAAADaHtOrtFtKL0dF8kb+/6JSkbGm3dHigb9jdC7Q1NQXD6U5NM0WcPLnAJAABQ97a92LZEK6KKDP9tRmxo+EuSObkvSa7WZFvz87XmGwQAYFOWK37c5/V+SQoCaavhgTLBpjbPzcm77JH82GcvLhAAAAB1bdil0XW9xWSM73VGtQXKZQZ25dxY84VdfmdP8dxSWTgDAACoW8MvjY5b3ZfcbD2v09YUaFTboN8zrwgDM3bOJPOSj57KxQ4AAKBulSJ7re/hHxpp5LAhjcv2OE5+6rofVwgAAIC61H5Z6ft9kd3M9zqbtQba4Jm/TTFmUufv7BFOG3KEAAAAqEt9Rf2H7zXCQGprLm9UWtmvOWrHKQIAAKDujLg0Pr8Y21bf67S3BGUflrNW7+u43u7npCGHCAAAgLpTTOJzKrFOW97RmDTJJ9wUcocAAACoK8MvsyP7SnZn3+s054xCR1PSypxSazcHqqlmAADYFKPkTGv9f4q9Jed0ja0699TeLguWiwAAAKgrSRJPqMQ6+QHe9GegbKyjnBYsEwEAAFBXosR0VmId5wFAyT5OC5aJAAAAqCtRYkf6XiMbGhnXVxmM2c1xxbIQAAAAdSVOlPW9hqvDf2+xg5eqQ0QAAADUjZ2utE3W971/JW3ygX9D0+al6hARAAAAdWNVoM0rsU7gfP9fkuT9xkWDQQAAANSNfJ+WVWKdxM82Q4+PokNFAAAA1I1FZ5ueSjzHPvEx/41Weag6ZAQAAEBdCUNT8r1GnHgoarXQQ9UhIwAAAOpKxtjlvteIEiv3VwHss64rloMAAACoK5lQ83yvYa1UjFwngOAJxwXLQgAAANSVIAxnVmKdPtcBINDtbguWhwAAAKgrTcXgMj+f0nuznqLTAPD6POlRlwXLRQAAANSVxf9mXm3KBi/6Xqe3aJ0dBrSyUzXJxG6quUEAAADUnUxgLqvEOqsLbhJAaIMpTgo5VImPUwIA4Ja1Qe43UXcptk0+l8kERqNHhuU+GOi+eScHhzlqyRl2AAAA9ceYpCnjfxcgSmzZuwBJYia76cYtdgAAAPXJ2iB/cbSkWLIjfC4TBtLozTIKhvaW+f/mnRwc57glJ9gBAADUpzW7AGf5ficbJ9KynsHvAlipOxOYczy05AQBAABQt1Z8OnNje0vwf97X6U3UWxrcxwKNMefMnmTme2qpbAQAAEBdu+oIvbbdMP9XtBevjFWKBxgCrL103knmar8dlYcAAACoWzPmRB+S9IkfHWy0WZPfEJAk0uIViTaZAYxuHr118O9em3EgrHYDAAAMxdR5tj2UnSVpeDaQjtjG6O5XpL7I35qxXXODoNZ8oKD/vDGrt9VMeuIDpuCvCzfYAQAA1KV8Ev9C0vbr/nlkXvrV4Ua+LwcUI6tFy99+OcDKXj56KzNh0TjT47UBR/gYIACg7kyfEx0voz/192uJpF88Kd31UuLhkb7/Yoy0eWug4c1Bn5X5ynMnm5/7W809LgEAAOrK1Hm2PbN267+/XzeSDt5SGtNu9MQyv5cEEum1MA6PWfAJc5O/VfxgBwAAUFemz4muktHpA3ltIum3c6VbXrDqHuTH+DYml1FPczb83vJPh992VrTCCAAAgLqxsa3/jUkkzXjB6PaXEi1YZYd0aSAwss1ZdWUz4S+WfSr81eAr1BYCAACgLkydZ9vzSfyk1jv4NxSrStKvnzG/fWJJvHOUmI4o1mZxYrPrZ4IwkA2MKWUCLc2EeipQMMO0B1cvm2RWlPe7qB2ZajcAAMBA5Gz8M5U5/CVpeFa/u+8j4cff+vWdrrRNy/u09fLNtSCaZGJJKpa7WA1jBwAAUPOmzYuOM4ludlDq9diEY0/oMK86qFXXuA8AAKCmTZ1n202i/3VRy0r/xvBfgwAAAKhpTUl8oaTRDkpNndiZ+b2DOg2BAAAAqFnT55TeZ6UzHJR6XWH4WQd1GgYBAABQk6bOs+0y5nK5Oa/27xN2MYsd1GkYBAAAQE1yuPU/fUJn5kYHdRoKAQAAUHOmzSkd43Dr/2wHdRoOAQAAUFNmddnhxpgr5GDr30jnsPXfPwIAAKCmlORu6398Z2aqgzoNiQAAAKgZ0+aUjpH0SQel2PrfBAIAAKAmrN36d3Lq3xr9B1v/G0cAAADUhJLin0rawUGp6RM7Mr9zUKehEQAAAFU3c17paElnOii1hK3/gSEAAACqalaXHZ4kbk79W8Op/4EiAAAAqipS/BO52fqfwdb/wBEAAABVM3Ne6WgrfcpBqSUKw7Mc1EkNAgAAoCpcbv2LU/+DRgAAAFRFSfGP5Wjrf0JH5gYHdVKFAAAAqLi1p/4/7aDUkkyGU/9DQQAAAFSUy61/Y3Xu8TubVxy0lToEAABARZVs/CM52Po30szxu2aud9BSKhEAAAAVM2Nu6b0y+oyDUkvCDKf+y0EAAABUxJ8fs63Wmkvl4oY/Vp9l6788BAAAQEUUWuOfSNql3DpGmjlx18x1DlpKNQIAAMC7GXNL77VWLrbsl5sk/DcHdVKPAAAA8Mrl1r+k/xi3m3nJQZ3UIwAAALxytfUv6U8TOjO/dVAHIgAAADxyufUfJOH/c1AHaxEAAABerN36v0Rutv7PZevfLQIAAMCLvtb4x5LGOCj1pwmdmWsd1MF6CAAAAOemzy0dJSsX9+hn698TAgAAwKk/P2Zb5ejUv5E+y9a/HwQAAIBTfS3xj+Ro6398Z+YaB3XQDwIAAMCZ6XNLR0lysWW/IhI3/PGJAAAAcMLl1r81+uxHOs1CB21hAwgAAAAnelviH8rF1r/RzRM7MlPK7wgbQwAAAJTtpq7SkUZysWW/IrKc+q8EAgAAoCx/fsy2BmLrv94QAAAAZelriX8gqaPsQmz9VxQBAAAwZDd1lY6U9O8OSrH1X2EEAADAkMxcZFtcbf3L6HNs/VcWAQAAMCRJt5utf2M1a0JH5moHLWEQCAAAgEGbPrd0mBxt/ScBW//VQAAAAAzKzEW2RdZcJQczxFh9fmKHWVB+VxgsAgAAYFBcbf1L+uu4zpCt/yohAAAABszl1r814aeMMdZBLQwBAQAAMCAut/6t1RfY+q8uAgAAYEDi1fH35eaGP7dO6AyvKrsOykIAAABs0rS5pUON0TkOSq2wCs9k67/6CAAAgI2auci2GKur5GZmnMfWf23IVLsBAJVnnxo7TGE4SkmYqOfAReaAS0rV7gm1y/ZE35NMZ9mFjG4dPya80kFLcKD82zcCqFnWKlDX7hNl+06V7TtASd8oJaubZeN/vcgYyeSsNbmCgmEvm6D5AZn870zn09Or1zlqxbS5pUONNX9T+e/+VwZBuNe4MeZFF32hfAQAoAHZ2WMPlF31A8VLD1fSnR1SkaCtqOzmd0jtXzG7Pvqo4xZRB2Yusi1Jd/Soi3f/Rvr0+M7M5S76ghsEAKCB2Dl7HGHjFZeaaPGuUuKoaiCb3fYZkxl1mul45GFHRVEHps8t/UzWfK7sQmu2/t/Pwb/aQgAAGoDt6hiuuHiTokXvfdP2vksma5XbaZpK+5xsxt5Y9LMIasXMrtIhiczfJIVllmLrv0bxKQCgztnZYw9XaclLKi3wN/wlKbO5sS1jP2xHZO+3Cz7u4jawqFEzF9mWRLpa5Q9/Wel8hn9tIgAAdcx27XqBSl13K14+zOs6ze+QbTtSMs2S9E4bJg/Zlz52jM81UT1Jd/QdF9f9rdVtEzpCrvvXKAIAUKfsnDG/UN+878iWvF7Ksy3vlJr30puuGFq1W+lmu/CUST7XRuXN7CodIplzHZRaGYbc8KeWEQCAOmTndn5Lxfnnujvot4F1Wg+Qmnbb0C/nrDHX2UUfO8FrE6gYl1v/MvoiW/+1jQAA1BnbtduZ6pv/NVnPb6yadpXym9wFDq3VNXbRyQf4bQaVYLujb7va+h8/JrzMRU/whwAA1BE7Z69dVFhwsdfDfpKU2Uq2+Z0DfXWLtcEf7IITR/psCX7N7CodYmU+66AUW/91glsBA/Ukee0O2V6//781GdnWd625Q+DA7ZAE2V9I+rinruDRHfNt06oouly1vPVvbdB+mXZ0XteRtnatCEoacOh58VSzzGc/A8F9AIA6Ybt2+7L65nzf+zot+0pNewzpe421R5vtr7/dcUvwbHpX6SeSOc9BqdvHd4THuHr3P+Iyu2OUlK4uRubgKLb5WtpSMEZqbw7UmjfKhWaQeVmSVJT0rJW5flhRFz3+CdPtvsuNIwAAdcDaIzN6+pHVSlblvS4Utsq2f0hlXB183Gx73b7GDPydEKrL4Q1/ukMb7v2hXc1zLvoacVl02uqCvTJObPm7Eo5lQ6OthwfKZpyN0OdMYMbNnWSedlVwIDgDANSDrpe+6334S7JNe6jMvxb21qKPjXfUDjyb1WXziXSZHGz9G2POczX82y4uHb66L7mqFod/EEhbj3A6/CVpF5vYW8ZMsVu6LLopBACgHsRLzva+RtAk5Xcpu4yVPd9BN6iAkqLvSmZPB6VuHzcmuNRBHUlSbHV9bGtzPo1oCZQNvGyej1Yu+R8fhTekJv8FA/gXO3vPoxUtG+59odwOcnEGTDKH28UfKz9JwKsZXcWDJQcP+lmz9f8ZV9f9R11pO/siu72LWq4ZIw3P+xyb5rRtZ9oWjwu8CQEAqHV29QUVWSbn7O9co1gnuyoG92Z12byVcXLq31pzvqutf0kqxskJvm9xMVSZwCjwOzVbmlbLxY7MgBAAgFpnu/f3vobJSaG7y4/W6mhnxeBcSdF3XG39T+gMLnFQ5w3W2u1c1nMprMDENFZb+F9lDQIAUMPs/H1HKFre7n2hzMjBfu5/Uw61Xcd6P7SIwVu79f95B6W6E4VnebjhT6rnkg0r9/tP9b9ooOZFxff5vt+/pDUBwK0mtW1R9i1l4ZbLrX9Z88UPd5p55XeFaiEAALXMFg+tyDKhhzOGSbTBpwihOoo2+rajrf87xncGFzuogyoiAAC1LIl2rsg6xsduvanZa7lpNG1O8SBjzBcclOpO5O7UP6qHAADUtMT/x/8kyWTd10xUmd6xSbO6bN6Y0M3Wv8x/svXfGAgAQA2zUmUO0hn3zxdKpGbnRTEkJRN9S7JjHZS6Y3xH8L8O6qAGEACAGmaM6a3IQknJeckgUMUfboK3mzaneJCskwf9sPXfYAgAQE0zKyuzTtF9SWtXuS+KwXC59W9kvsTWf2MhAAC1LMjNqcg6ScF5yeeiD2xvreWJo1VUMtH/uNr6H9cR/MZBHdQQAgBQy8LsvZVYxsQrnNd8Pjr6SzPnJv+Y1hWNIwhU3tqtfxcPZmLrv0ERAIBatrTpNiv3B/TeJl7mtFxkm9Rtt5SV3d9IMwgCleVy69/KfJmt/8ZEAABqmDng4R6FI5Z4XyhaKpd3HFyS7C673qPc1wWBGV3Jo9O7ohMJAn4VFX3Txda/ke6c0BH82kVPqD0EAKDGmaDV/2UAG0mll52Vez3ZwOwxdm9JU2fMjR+cMSf6kLMF8YaZXcV3Gjk59d9jDVv/jYwAANS6ppbJjh/U0y9TXOikjlWgl6KDNvWyA6zRzOlzogenz4mOd7IwNKvL5hOFUySVf2cnY748ocPMLb8r1CoCAFDjzE5P/1OZzV/zvlBxgWTLvx/Aq8leKtgRA3ux0YEy+tP0rphLAw5EiiY7OvV/7z/HsPXf6AgAQB1Iwu1/4n0RW5L6yv/U4bzSUHb27T6Sps6Ym/yTIDA0M7uK77Rycuq/RyY8Y7IxFXgMJaqJAADUuJmLbMuf9I8PROEO3tcyhTlrzgMM0ZJ4dy2Jy3kI4JogMHNu/MC0edFxZRRKlVldNh8rvFps/WMQCABADfvzY7Y16Y5nSTrqsexF8n4WIOmT6X1qSN9qFeip0sedtGGld5lEN8/oiv5OENi0SNFkI/sOB6XY+k8RAgBQo/78mG3ta4lvlvQeSXpJx2lF9n3+Fy48M6T7AjwXfUArEre7FOuCwPSu6IEZc6NjnRZvENO7ivux9Y+hIAAANWjmItvS1xLP0Nrhv869wQ2Kw638Lm6tzOoHBnUpYKUdrWeLH/XYlA6yVrMIAm82q8vmraNT/8aYr7D1ny4EAKDG/Pkx22q745slvfetvxapTQ9mb5Q1TX6biJfLdD8woJcW7XD9o/A5JQ4uPw/A2iAQc1hQUknRNxxt/d/3yJjgVw7qoI4QAIAa8ufHbGuhJf6TlY7c0Gte0yF6NH+NZDzfIri4QKbn0Y2+JFZODxY+r55kS7+9vI3dV2tuKHTftK5oXIUXrwnTu4r7SeaLDkr1BAFb/2lEAABqxMxFtmVTw3+dBZqoJ/KXSSbnt6m+Z2R6HtnQry57qXTQp5YlHTdKqtbd4g420ozpXdH9aQoCs7psXo5O/VtrvjpujOly0BbqDAEAqAEzF9mWpDueOZDhv858naqHctNkgzaPnUnqmy2z+u+Sjdf/6vMmDI/Yaad/u2JCZ2aSUXKopD+JIFARRUVfl+xeDkrd92hn8EsHdVCHCABAla0b/urnmv+mLDLv0+25x9SXcXHzt40oPiez8i9SvFKSvckUc/uZra95ct0vj+/MPTChMzNuvSBQLQ0fBKZ3FfczMv/poBRb/ylHAACqqJzhv063RusvmUc1L/8/sqbVYXdvVYxN39xfBNtdf4LZ+arl/b1ivSBwiAgCzk19yuZcbf3LmgvY+k83AgBQJTMX2ZZ4dTxDZQz/9T1lvqq/Ns3V8vyHXleQd/euLsgnyu34fxpx4NZm12c/N5BvqbUgMK0raojDgk1ZN1v/Vrq/wNZ/6hEAgCpYN/yN0dEu6/bZLW55NDtjtDJjt1J+l4uV2WLJkO4eaIyUGfWamnf9uZoOH2l2e/44s+2drw+2TK0EASMdUu9B4KY5xX2tMV9yUKonDMLTJxkTb/qlaGSp/gwtUA2+hr+kW4Znwg8ftbPpW/+L9sX9tlVv99myhffJ9u2opHdzmSgjG619A5CLZXIlmcxyha1dMs1/Vqb1CrPzP15x3J9mdpUOSWQukDSUJwY5Y6X7JX1vYmdmZjX7GKipT9lcPpc85OLdv5H5wvjO8Gcu+vJh+KXRL1f1JedUu4/+NGWNth0Rel3DGnP8cyeZWV4XWcvzB4kBrK/Sw1+SzA7/XCTpG2t/9KPouJUNG9eZvV/SuGoHASMdojU7AnURBPL56L9ljZut/47gIhc9of5xCQCokKkLbHOlh3+tGteZvX9CZ2ZcIFvVTw2suzQwvSu6t1YvDdw0p7ivrPmyg1I9SRCewdY/1mEHAKiAqQtsc74QzxDD/01qZUdA0qFrg8B9Vvq+zx2Bjjsmb18wfSdGNt4/NnaXOEnaE9mmIDB9GROsChW8Hsg805xpnvmdEd94IDDJFMmWf8Mfma+dMMbMcfF7QGPgDADg2RvD3+oYx6Xrevj3pwaCwDpOg8AOf/vKMX1x6b+74+L+PXGx1Q7wfklNQdbukNvKHNV2kD7QeqRCM7Trz1a6v9gRvrse3v1zBqByZwAIAIBHDP+hmTa3dKix5quq5yBgJwfb3tX7tVVxz3mr4kJ7uY00B1nt37Knzhw5SZuHmw3mW/tiG77zhF3NM+X2UAkEgMoFAM4AAJ54HP5/buThL0kTO7L3TejMjLPGHqbq3kfg0KGcERh9xwVntN62ZOWi4rJvuhj+ktSblHTP6sd09oKv6zdLp6g04MOb5r/qZfijsjgDAHjgefhPbOThv76JHdn7JI2rgR2BN4KAlX6woR2BXR76cvvKlaW7Fkav72M9PRWhZGPdseohldSjk9tP0Jbhhp/EuGbrP/i5n05Q79gBABxj+LtXQzsCh60NAve8dUdgp7u/+p5XVnS//Hq02tvwl6TNM616V9vOUlDUjatu1OOFxzf00oIUfroervujOggAgEOzumw+X4hvZPj7UatBYKe7vzpxUXHFbT1xsdnnolvn2rVP22jlgjXXoWPFurP3Tt3Vc7fe9iBGY/5rYqd52mc/qG8EAMCRWV02XzLxH2R1vMu6VvoLw//N1gUBGXu4qhwEHup9bMbCwvKbiknk9XTY9vnNNLZ1635Pbj9WfFS3996xfgR4oDAmqNm7/aE2EAAAB3wO//ZMOIHh378JHdl7qxkEZhfm6UevXq7I+t1l3zLbpt1attTGPrj1ZOFJPdD7gCT1KeaGP9g0AgBQJoZ/9VUjCHQn3fr24t+okERe1xkW5rVn6zYayKe2/1F4UPf03vvHCbub2V6bQkMgAABl8Dn8i01s+w/WuiBgZI800p0+1/rW4l9qZdzjcwkFMtpr2HYKzcD/qn6k8PDx7//7j3b22BYaBAEAGKJZXTZfUvx7X8N/0mjT67JumozvzN41vjNzVBDYd8voVtf1b+u+R8/0veC67Nvs3LyFWoLcYL+tPQnC//XRDxoLAQAYgjeGv+PPpTP83Ro3JnvPhI7M+1wGgZJKunLJH12U2qjWMKcdm0YO6Xut9P6jH7pwouOW0GAIAMAgTX3K5hj+9WVdEEhkj5J0Vzm1frd8plbF/q/M7NS0uUw5d2u39tuT7WT+jscG8YcDGISpT9lcPhf/Qe7vSPdXhr9/H+7M3jmhM3Pk2iBw92C/P5HVn1fe56GzN2sOstoqV/YdhMfe9VBbtZ+lgBpGAAAGyOfwLzSFExj+lbM2CLxHxr5XgwgC93T/3fvBP0naLr+Zkye1BTKfdlAGDYoAAAwAw78xTejI3jGhM/OeILDvtla3ber1t6z6WyXa0pa5NlelPnjsI78Y5aoYGgsBANgEhn/jGzcme8/EXTPHGGOPllG/Uz6R1dy+Bd57aQvzag6yrspli1HpA66KobEQAICNmPqUzTXl3B/4E8O/Jo3vyN4+oSNzRH9B4JnCbBWs35v+SNJm2Ra3BY2OclsQjYIAAGzAuuFvpQE/B36A7m7qCT/M8K9d64JAENh3S7pdkh7pfaoia7eFTY4rmkMcF0SDIAAA/fA8/I/7wD6m23FdeDBuTPaeCZ2Zo4PAHjO38MKqSqzpPgBozJF3TM64Lor6RwAA3oLhj7caNyZ72wull1ZUYq28u+v/6+Qyw9p3cF0U9Y8AAKyH4Y8NiRM5vjj/dkZGGePiA4BvlhiNcF4UdY8AAKy19rT/jQx/9CdRMuib8g9WGBgN5Kl/g66bWGefK0TjIAAA+tfwlzTecem7C8XweIZ//TPGWN9rWE8r2CCJ/VRGPSMAIPW8DX+jvxWK4fGTxprVTuuiKoxV0fcasbXykQHi2FTkACPqCwEAqeZ1+BfC4xj+jSM0QQWGqFVk3b9Ztza7xHlR1D0CAFKL4Y/ByJnghUqs0xuXXJfsvvOgc19yXRT1jwCAVGL4Y7AyQeaflVjHw6OGn1EFzi+g/hAAkDoMfwxFNpO5uhLrrIrcBgCr/p9tABAAkCprh/9UMfwxSM8f9t1Hm4Os94OAS6JuyeVRQKs73BVDIyEAIDXWG/4TnBa2uofhnw5tmfxDvtfoS0paGRVclVvZG+lWV8XQWAgASAWvw78UHsvwT4eczX2rEussLq10VMn+/v5Dz+OhU+gXAQANj+EPVxYe9f1bhofNS32vs6iwQpFNyq6TBPbXDtpBgyIAoKFNfcrmcrn4d2L4w5H2bPO3fa8R2VgLC8vKqmGkWXfs/8WHHbWEBkQAQMNaN/yNNNFpYYZ/qi044vsXDg+bvN9YZ0FhmUpDvylQbKz5L5f9oPEQANCQLn7IZhn+8GVEtumkwMNDe9ZXTCJ19bw6tG+2+tVf3/WFR912hEZDAEDDufghm92qPZ7qY/gr4bQ/pBeP+OFtW2Xbpvte5+XiSi0tDfo5UrPj1jzv/rFJBAA0FG/DX7pXSXjchN15qArWePnIYSe0h02v+F3F6snuRepNBnx74N4ksSfdOfYcQio2iQCAhuF1+MfhsQx/vImZnGzRNHKfYWHO67At2ViPr16oeNOfCoiN7Gl3HHT+Yz77QeMgAKAhMPxRDfMOm/zqts1tBzYHOWd37unP6rigf65esLGPBsaSzr71wPP/4LMPNBYCAOrexQ/Z7NbDPRz4Y/hjAOYc+r1nR+Wze7aFeVd37+nXiqhXj6x+sb9PBhSM1cduO/C8y32uj8ZDAEBdWzf8ZfRhx6UZ/hiwF9994XObB+GOm+eGPe1znVVRnx5c+bxWRG/c3G++lY649V3nTfW5LhoTAQB1i+GPWvL8UT9bvuTIn47dLtd+Yc5kyr+N3wb0JSU9svpFvRatnhVnzDtvP/C8B32thcZGAEBdYvijVr105I/OG53bbKdR2WEP+7hXwPBM86odm7Y4+/FDvn78nft9YbnzBZAamWo3AAzWVGvDfFc8xcPwv4/hDxfmvec7CyQdMPqOC95RMMVLlkc97yomUTjUeoGMRmRaXmkNchctOPIH3/V62ACpQQBAXVk7/K+V0cmOS9+nOPwgwx8uLTjqu09KOnTs1Mm5FVv1faGQFE/qtsXde6NSO7CPWAAAG7VJREFUs5Xd6Pc2mWzSksm9lDPZe9vyuf/pOuTbz3h/ChFShQCAusHwR716atLkoqQfrP2hjgcmDy9FhWNKcXKglR0ha4eZMChmpFcDqxejYnjvwmO++3jf2u/3fLchpBQBAHVhqrVhfl58DcMfjWDuwZNXSvrj2h9AVRAAUBH22lOHq7hsD5lgc8m2KjAL1dz8opl040ub+t43hr/VKY7bYvgDSC0CAJyzVoGuOu5UqXSS4ugAxdHmWj0/o7de8+yV7MWHWZlst8LsPIXBrVLzb8wZ0+ate4nP4Z9VeOxxDH8AKUUAgDP20g/urSD6mS4tHK5kWXZg35QY2cIwJYV9VNI+0qrz7WXvXahM08VPH/iuH86dF1/lbfh3Gg5TA0gtAgDKtmbwF3+r0sp3KN74yeYBVJOi3u0V9X5rj/v/Njmz87Xhszt83Emfa6vfn2P4AwABAENnJx+Z0Q6561Va9RHFifM7npioJ9y162Lt+NJM3bfvhVrVvG1Z9dYO/w8y/AGAOwFiiOx143bXduZlFVd9VNb98H9DmFc+k9URz35TO75255DLMPwB4M0IABg0O+WDJ2j18icV923hdaFcmzRseynIKkyK2ufFq7XXgt/K2MFdZmD4A8DbEQAwKHbKsZ9R76rfq4zbmg5Ivl1q2VIyb95c2PnVW7X//P9V8PZHovaL4Q8A/SMAYMDslR88Qb0rLva65S+tGf7No6QNPEhl22UPat/nL9fbPlb4Fkbm4UwuPJ7hDwBvRwDAgNhLjttXxe6pstbv8M80S02jNvmy7Zfer90XTdvYSx7oC4KjP7SjWeasNwBoIAQAbJK9+Kys1H27rOdt/yAjtW69oTf+b9P5ykxtufLJ/n7p74Ug/OCkMWaFy/YAoJEQALBpmef/qKS4mfd1WraUzMAzhrFW+z1/mbJxz7++JvNwmAuPZfgDwMZxHwBslL3ygweqtPJ47wtl26RMy6C/LV9aod0X3aQnRp8qSX/vC4IPTNqxPoe/nT32QGtX/dQkq/eWLTZv6oxDRZlcovwuK21uu16pJZYJBt6cUSLpFWt0RxBnLjajp2zy+Q8A/CMAYOOS6Dolnq/7y0jNI4f83Tu9drte2OKIx15r3ekD9frO33aNmaLC7NPMAD/dUFG57WVbD5JMbtOHMzasw1gdboPofPvSxz5rtrvucmf9ARgSLgFgg+wVxx2kUk+H94VybVIwsEcH9MfYRO9+5jtP1u3wn73zVep77jTV5PDfVrb1cMnkXFVssdJlduGpp7sqCGBoCADYMFv6RUW2oZtGlF0itIVJduony3mHWhW2a+yeKi38RLX76JcJZVsOfNu9GFywxv7Svnri1s4LAxgwAgD6ZScfmVHUt7/3hcK8FDh5d5lVEp/solBFJat+Lht5vsQyRNkdpWDw5zIGaJiizBm+igPYNAIA+rdTy7neP/YnSdlWh8Vs3QUAG/fuW+0eNsRm/d7p2SbmCK8LANgoAgD6FxdPqMg6TgOA3mWvPXW4y4L+lZz+C3AqyPutb8QlAKCKCADon4328r6GMa6HTEaZ8DCXBX0z8nxb5bJ4/+vB/w4TgA0iAKB/ccn/O+kwP+C7/g2YTcY6rggADYkAgLexVxy7p/cH/khlffRvg0ywm/uiANB4CADoz54VWWUQt/0dOMt1ZQAYAAIA3s4Yv8e/31jHSwCos0OAAFAdBAC8nVFzZdbxcJXBmib3RQGg8RAA8HbWVuaWuknivqYxq9wXBYDGQwDA25lgcWUW8hAAZAkAADAABAC8ycx5pcP/csDlF1RkMRu5r2k0331RAGg8PA4YkqTpzxX2Vhx+LUl0Yl9+C9kwLxMX/C7qo741s90XBYDGQwBIuZvmFPcNTfA/Nta49b9eyG+hpp6X/C4eR5JNJONyIyp+xGExAGhYBICUmtZl9zSKvynpI7af+/EtG/EObeM7AMhKcZ+UcfbEueUKigQAABgAzgCkzE3P2J2mz4kuNoofl/RRbeBmvC9sc2xlGip1u6z2VzPpxthlQQBoVOwApMRNz9idwkz8dav4NA3gv/urI/ZXnB2usLTSb2PF1VLTKDfPBLD2WgdVACAV2AFocH/osttPnxv9JsjEs630SQ0i9L2y1Xs8draWjaXIyS7AKwoLt7goBABpQABoUDfPt1tPn1v6WUZxl6z+n6TcYGs8NuYcWR8P7HmrwjIHRcxPzaQbiw4KAUAqcAmgwfzxGbt5mInOjaL4PMm0lVMryrRq8Zbv0dav3OqqvQ0s1CdFPUM/DGj0qkzvb9w2BQCNjR2ABnHTfDti+tzSt8JMPF8y35BU1vBf55E9vqTE3Sn9Det9TZId4jebL5lJN6522Q4ANDoCQJ2b/qxtmz4n/loQxfNlzdfkaPCvEwXNemrXc+XmlN5GxCWpb0iXAu7QpClTXLcDAI2OSwB1auYi25KsTs6Rib8kyevje+dv8yFt++rd2vz1+30usyYAZJrX/BiY12RLHzdmyFsHAJBa7ADUmTvm26bpc+LPJd3xPBn7Q3ke/uvcv9d3VWje2vMqVup+RUoG9IyAoow5yZxywyLPTQFAQyIA1ImLH7LZaXOjT6yM4qdl7M8k+Z7Gb5IEGd1x4OWKc8P93mjHxlL3y2v+dyOvktWnzUlT7vDaCwA0MAJAjZtsbTC9Kzpx6/b4aWN1taSdq9KINY8Xs8MnhU357ZRpWuJ1rbggrXppQzsBRVnzcXPKNdd47QEAGhxnAGrUZGuD/ebGH9Hc6NuS2bV6nZinJPvN8Z3B740xVpLslRM7JPNPRb07eVs2KUqrF0qt20hhft1XX5cxp5iTp3j+XCIAND52AGqMtdZM64rG7Tc3eVjS1GoNfyP7jDU6vdAR7DOhM3PjuuEvSeaT05abT9++s3Jt18p4/HRAEkmrFkrFFZLVPbKZd5qTGP4A4AIBoIZMm1M6Zubc5B9GmiHZfavShNHzxpiz+zoye03syEyZZMwGL8abM/9ympqGH6pM/mVv/QRBoqjwO618+r3mlCsXeFsHAFKGSwA1YNqc0jGBMd+x0rts9T7R9qIx5jttC4IrjjrKDOgYviSZ02+5X9K29sr3n6tS8etKCm4+lWACq0zrfTIjTzFn3sDgBwDHCABVNH1u6TBZ8y1JR1Xxg+yvGpmftmWCnx+1s+kbahHzyb9cJOkie8VxE2SLX1VU2F82Gvyfr0zTawqar1feTDan3uziIQEAgH4QAKpgRlfxYKvgv2T1oSq28bqR+XFfU/CLSaNNr6ui5sxZ0yVNlyR7xfveI2tOk5K9ZePRsrZN1mYkGygwRSksSFomEz6rMPsX2dwU88lpy131AgDYMAJABU1/rrC34vBrVjqxim0skewvs8r89LhOs9LnQubMv94l6S6fawAAhoYAUAEzugpjrcJvKNZH5f2m+hu0ysr+uhhkvjdpjFlRpR4AADWi4QKAPeusrJbGH1EcvV/SHkribZSYvJTkFJiCTNAjo9dkwmeUDf5Pi+fdZO68c8CH3gZj5my7exzEF1jpY5JCH2sMQLeV/WUml/nBh3Y0XFMHAEhqkABgT/z3YYq7L1AUf0IvrthW1m7qXfYYSQdL+qSat7J2/MdfVi53jcyqb5sby3+s7E3P2J2CMP5qYuIzTfX+HfcYYy8Lw8z3jt/ZvFKlHgAANaquA4A98awdFBcuV/fS9ypOhnZPg8QaFYrbqlD8ssLMf9qJp92rtvzp5prL5g+21LS5dnSg6IvWxmdLym/yG/woyuoqJeE3x+9ueFAOAKBfdRkA7Ikn5pS0XKvVKz+qJHF3TT2OA/XG71ahNM9+9IybNEynmquu2uRH4/44124Z2Og8Y+PPWZkmZ/0MTslKNwRx+I3xu5tBhxcAQLrUXQCwHznzGPX2TVOpt9XbIkliVIpPUDDiYXv2uSeaiy96ur+XzZxtt4iD6IvGxp+VzIAfYu9YIukPMuEFEzvM3Cr1AACoM3V1K2D7kTN+qO7uv6gU+Rv+kjSiTdpypBQGeyoJHrSf+fyp6//y1KfsyOldpclJEM8zMl+WVI3hn0i6UXG454TOzKQJDH8AwCDUzQ6A/egZ12tVz8neF9p8hNT6pnneKtlr7Fmf77zxcxf+uCmXnGMVf0UyI7z30j8r6ebEJv/94V1zj1apBwBAnauLAGBPOP2PWtXzYb+rGGnUCKm530v4RtZ+Y59/3PylZw/7YLW2+iWjWxMlX/lwR+7hqvUAAGgINR8A7Aln/Erdvoe/pJHDNzT837DrvX9t7m1t1wv7HuK9nfVZ6S+yydcndub+XtGFAQANq6YDgD3pjBO0vPffvS/U1ioNaxnQS/e69SatGrWNlm63k9+e1rjLJva/J+6W/VslFgMApEfNHgK0p5yyhVYXrpfvx+Nms9KI4QN+eZDE2v9Pv1W2MOQH522Sle631r5vQmfmSIY/AMCHmg0A6s3OUBTnvK8zsn3Qd+dvXrFUu/3tFuetGJmHbaDjJ3ZmDp24a/ZW5wsAALBWTV4CsCee8T6t7PV/oX1Yi5TPDulbd370Xr2490FaueU2DhoxT1hjvzF+TDDNGON5ywPARtnJwXZ39/1wddL7iZ6otHnJRjX1RmlktlXb5UeoPWxWzmRkBvcGpldG8401M21sLrzt4M8v9tQm6kBN/cF+Qyn6lfetf0kaPvTbCZgk0a73/7XMBuyz1uj0Qkew38SOzE0Mf6C6dr3t29u1375s8UuFpeevKPWOqqXhHxijsa3baL9ho7Vltk35YNDDX5KaZbWnlf2ywmT2Uf/4yXEeWkWdqJk/3OvYk844UH3FTu8LtTZLmfI2QLaZ87iGLX11KN86b83gz7xjYkdmyiRj4rIaAVC2sVMn517Ra4+viHu3qHYv/dmjZWttnWt3WbI9kPnjex/8yaEui6J+1FwAUCH5biXe/A/01P/GGGs1+omHBvMtL8rorFdWhHsw+IHasmzU6l+vjHtHVruP/ozMtLoe/uvkZXTxiVOnVutx5aii2gsApdIR3tcIQynv5nzh9s88LGM3mVheNTJfGZ4Jd5vQkbn07ANMycniAJxZmRROqnYPG7Jd3t+NR43MO5aOWcguQArVVACwk848qiIn/1vcPam3eeVytb3+8oZ++VXJnF9oCnca3xn+4Kidjb/PDgIYsrFTJ+e64+KwavexIcMznm9AmpjK3t0MNaG2PgUQ2TMqso6jd//rjHqhSytHbfvGPxtpqZX5caEYXDRprFntdDEAzvXuWNjJrqjdM7i5wPMOvbVb+l0Atai2AkASHViRdXJuA8CIlxes++kKyVzYFwQ/mzTGrHC6CABvokKN/V34VlaDvl/JoJghfJ4Ada+2/tDH1sWH6jcuCKSM2zQ9bMniRLI/KBQzP5401ix1WhwAAA9qLABEbd7XCNwfe2h/bdHqCZ3ZC5wXBgDAk5o6BKjE+u8n8LDTZTXMTp5cW/8uAQDYiNoaWtb6vw4Velki0Is9Q7+tIAAAFVZbAaAS51B8HfRt7S16qgwAgHO1FgAS72skXhJA0Vx0UcFHYQAAfKitABBU4A55iZeMMaQHAgAAUC21FQAyof+P0EWxtOlb9w6O1Wy3BQEA8Ku2AoAJ5ldknVLktp7RM24LAgDgV20FgKyZVZF1io7P61lzl9uCAAD4VVsBIJO9zO/9LtfqcXpeL1EQ3umyIAAAvtVUADDXX7ZY+ewr3hcqFNx9GsDqDnPJT153UwwAgMqoqQAgScpmrvG+hpXU0+umljHXuikEAEDl1F4AKOYmKwwdn9Lrx6puF1UWy/RMdVEIAIBKqrkAYGZe0qOm3O+9L1SKpJ6+8moY+1NzySU9bhoCAKByai4ASJLC1s8ok/F/a90Vq8q5NfCL6s39ymE3AABUTE0GAHPjr1erNf9f3hcqRdLKVUP97nPNNT92ch0BAIBKq8kAIElm6pU/Vkv+ce8LrVwtlQZ5B2KjK82lP5/hpyEAAPyr2QAgSWpJ3q1sxu+7bCvpteUDf0aA0ZNS73947QkAAM9qOgCY3/52pfLZgxSGfh8SFEXS68sHch5gkeLoQxz8AwDUu5oOAJJk/nD1UxrW/AHvHw3sK0ivL9vwg4KsXpGC95vLf/WC1z4AAKiAmg8AkmSmXnGHRrQerEymzM/tbUJvn/TaMsm+7XJAlxQfai698Cmv6wMAUCF1EQAkyVx32cPabNguaso/73WhvoL08hKp+MZVhxlKgoPNZb+szJMKAQCogEy1GxgMc+0lL0va2Z5w+qXqK5ypOPETYKJIen1Zos1HfEVTfvNjU87dAgAAqEF1swOwPvPHqz+jtvyuam561PnTA42RWvKPqSm/u5nymx8x/AEAjaiudgDWZ3539TxJ+9kPf+odsqXfqFg6WHE89N9PJoyVy96vfOYL5oYrHnLXKQAAtaduA8A65qbLn5T0bjt5ckZPLDxbcfFkxfHeiqI2JXbD2wPGWOUyKxVmnlAQ/FGbZ39pLrnE78cNAQCoEXUfANYxkydHkn619ockyZ50xoGKzT6SRkraUtIrygSLFWi2Fs17xNxyp/+nDgIAUIMaJgD0x/zuqn9I+ke1+wAAoNbU5SFAAABQHgIAAAApRAAAACCFCAAAAKQQAQAAgBQiAAAAkEIEAAAAUogAAABAChEAAABIIQIAAAApRAAAACCFCAAAAKRQQz8MCANjLzt2PwXJubLJGBmbq3Y/b2LCPmWHPadM0zKZcJBPb7RLFeshbbPgbnMUT34EgPURAFLMXjduC/X03al4+VjV2ng0kpo2l3IjJGOOlCRZO/g6gaTFo+faG04/x5x89V9ctggA9YxLACllrxu3hVavmq9o9VgNYa5617KNlN9MMsZFtQ4pmWVv+PipLooBQCMgAKRVb89dSgrDqt1Gv5pGStlW11VDyVxmp368w3VhAKhHBIAUsld+8EBFPXtWu49+GSPlR/iq3qTYfNVXcQCoJwSANErsuTW57S9JYbNkPP6xNBrvrzgA1A8CQColY6rdwQaFWd8rbGGnn9nmexEAqHUEgDQyyle7hQ1zcuhv41aUmv0vAgC1jQAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKZardgP3Up0aqaNqr3Ue/sklB+XzvoL4njgvmkkt6PHUEAIATVQkA9qTTx6hgr1GxeKAWrqp6CHkTY6ThrVJLsxRmpGjwJexZn1ugRFMVJz8wV170mvsmAQAoT8UvAdgTP/UxrSrMVm/fIYqT2hr+mYy09RZSe5uULaM1q9EyOl+Z4Cn7mc8e6q5BAADcqGgAsCedcaC6e65RnISVXHdAAiON2qy8wf92oyTzJ3vWuWNcFgUAoFyV3QEoxNcrjmvz4GFbq+vhv85mUvBDH4UBABiqig1je8qnt1JfoXbfCQ9r8VfbaoL95Lmj/C0AAMDgVO7deNEeL1ux1QYnDNf88LiCwmBfnwsAADAYlQsAxm5XsbUGKzAVWMRsUYFFAAAYkApej09q89q/JKkCASCwlUgZAAAMSA0PZQAA4AsBAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFCIAAACQQgQAAABSiAAAAEAKEQAAAEghAgAAAClEAAAAIIUIAAAApBABAACAFMps6gW7XW+3jaWtbFheWPi/+3+17ehXF5ZTwp9MRho+wusSj43YYecxU3+2v9dFBuih3vNamjLLq91G/4Jhkvz+t/hBZtI+Y6ZOWep1kQF6ovfIwCTd1W6jXzbYVcqM8la/L8k1j5lqa+L/E8nKB3fJh7dWu40NKha3UiDjrX4cD9uqVv5brOhJRuVjf7/XcmQz/vsyUke5/y1MrCSUFs8+xSzaxFpv13GtHa5Mcn4ic5qRdi6nEQAAUHlWmh9YOyVsCX4ye4JZ9dZff1sA2OV6e4Axdpqk7SrSIQAA8MdooYyZOG+SefjNX15P5w12j0T2fkntFW0OAAD4tEoyh8472Ty57gv/uq4/1YaJ7FQx/AEAaDRtkv2tJts35v4bPxmT6ERJ76hKWwAAwLe9O3bXR9b9wxsBwBr7kf5fDwAAGoG1yUfX/fyNAGCs9q5OOwAAoBKMMW/M+vU/2z+8Cr0AAIAKsevdaGX9APBaFXoBAAAVYqTF636+XgCw91ejGQAAUCn2vnU/+9fHAUzw2+o0AwAAKiEJguvW/fyNANB1krnbSjOr0xIAAPDK6KbnJpl71v3jmx7wUwzMGZJmV7onAADgj5GeLUXmU+t/7U0BYOEkszSbM4fJ6JbKtgYAADyZ1ReYw1481Sxb/4sbfLZhxw32/VLyCStzuKRtJOV8dwgAAMpWlPSytfZv1gZT5n/M/LW/F/1/PYxf50J8njEAAAAASUVORK5CYII="
      />
    </Defs>
  </Svg>
}

export const ViewListSwg = ({ active }) => {
  if (active) {
    return <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Path fill="url(#pattern0_1_2)" d="M0 0H25V25H0z" />
      <Defs>
        <Pattern
          id="pattern0_1_2"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_1_2" transform="scale(.00195)" />
        </Pattern>
        <Image
          id="image0_1_2"
          width={512}
          height={512}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  }
  return <Svg
    width={25}
    height={25}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <Path fill="url(#pattern0_1_3)" d="M0 0H25V25H0z" />
    <Defs>
      <Pattern
        id="pattern0_1_3"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#image0_1_3" transform="scale(.00195)" />
      </Pattern>
      <Image
        id="image0_1_3"
        width={512}
        height={512}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
}
interface TopIconSvgProps {
  color: string;
}

const TopIconSvg: React.FC<TopIconSvgProps> = ({ color }) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 0.712585L0 8.82069V21H20V8.82069L10 0.712585ZM18 9.77388V19H2V9.77388L10 3.2874L18 9.77388Z"
      fill={color}
    />
  </svg>
);

export default TopIconSvg;

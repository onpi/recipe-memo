interface AddIconSvgProps {
  color: string;
}

const AddIconSvg: React.FC<AddIconSvgProps> = ({ color }) => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.775 11H14.925V5C14.925 4.447 14.4135 4 13.7833 4C13.1531 4 12.6417 4.447 12.6417 5V11H5.79166C5.16146 11 4.64999 11.447 4.64999 12C4.64999 12.553 5.16146 13 5.79166 13H12.6417V19C12.6417 19.553 13.1531 20 13.7833 20C14.4135 20 14.925 19.553 14.925 19V13H21.775C22.4052 13 22.9167 12.553 22.9167 12C22.9167 11.447 22.4052 11 21.775 11"
      fill={color}
    />
  </svg>
);

export default AddIconSvg;

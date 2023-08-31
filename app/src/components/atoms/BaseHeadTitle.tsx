interface BaseHeadTitleProps {
  title: string;
}

const BaseHeadTitle: React.FC<BaseHeadTitleProps> = ({ title }) => {
  return (
    <>
      <p className="recipe_head text-lg font-bold pl-2">{title}</p>
    </>
  );
};

export default BaseHeadTitle;

import BaseHeadTitle from '../components/atoms/BaseHeadTitle';
import BottomNavigation from '../components/BottomNavigation';

import TitleAndInput from '../components/molecules/TitleAndInput';
import InputAndTextarea from '../components/molecules/InputAndTextarea';
import Header from '../components/organism/Header';
import BaseBtn from '../components/atoms/BaseBtn';
import TitleAndTextarea from '../components/molecules/TitleAndTextarea';

const AddRecipe = () => {
  const handleInputChange = (newValue: string) => {
    console.log(newValue);
  };
  const addIngredients = () => {
    console.log('aaa');
  };
  return (
    <>
      <Header title="新規作成" />
      <div className="container mx-auto px-4 mt-[72px] pb-[104px]">
        <div className="mt-6">
          <TitleAndInput
            title="料理名"
            placeholder="料理名"
            value=""
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <BaseHeadTitle title="材料" />
          <div className="ingredients flex flex-col mt-2">
            <InputAndTextarea
              inputPlaceholder="材料名"
              inputValue=""
              onChangeInput={handleInputChange}
              textareaPlaceholder="材料"
              textareaValue=""
              onChangeTextarea={handleInputChange}
            />
          </div>
          <div className="btn_wrap flex flex-col items-center mt-6">
            <BaseBtn
              label="材料を追加"
              type="submit"
              className="w-[160px]"
              onClick={() => addIngredients()}
            />
          </div>
        </div>
        <div className="mt-6">
          <TitleAndTextarea
            title="メモ"
            placeholder=""
            value=""
            onChange={handleInputChange}
          />
        </div>
        <div className="btn_wrap flex flex-col items-center mt-6">
          <BaseBtn
            label="作成"
            type="submit"
            className="w-full"
            onClick={() => addIngredients()}
          />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default AddRecipe;

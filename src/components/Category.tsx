import { CategoriesList } from "../atoms";

function Category({ value, text }: CategoriesList) {
    return (
        <>
            <option value={value}>{text}</option>
        </>
    );
}

export default Category;
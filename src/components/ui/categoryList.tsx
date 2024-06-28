
import { Card } from "antd";
import iconMap from "./icon";
import { CategoryProps } from "@/app/interfaces/data";

interface CategoryListProps {
    categories: CategoryProps[] | undefined; // Array of CategoryProps or undefined
    showCategory: (category: CategoryProps) => void; // Function to show category details
}
// CategoryList component
export const CategoryList: React.FC<CategoryListProps> = ({ categories, showCategory }) => (
    <>
        {categories?.map((item) => (
            <Card
                className='hover:cursor-pointer'
                key={item.id}
                onClick={() => showCategory(item)}>
                <div className='flex gap-x-4 items-center'>
                    <span>{iconMap[item.icon]}</span>
                    <div className='flex flex-col'>
                        <span>{item.label}</span>
                        <span className='text-xs md:text-base'>{item.amount} USD</span>
                    </div>
                </div>
            </Card>
        ))}
    </>
);

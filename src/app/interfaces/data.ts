
export interface IconMapProps {
    [key: string]: React.ReactNode; // Accepts any key (icon name) mapping to React components
} 
export interface PostProps {
    id: string;
    date: string; // Consider using a Date type if you plan to parse it into a Date object
    overallCash: number;
    expense: number;
    income: number;
} 
export interface CategoryProps {
    id: string;
    label: string;
    icon: keyof IconMapProps; // Assuming iconMap is defined similarly in your code
   
    date: string;
} 
export interface HistoryProps {
    id: string;
    title: string;
    date: string; // Consider using a Date type if you plan to parse it into a Date object
    categoryId: string;
    postId: string;
    amount: number;
}
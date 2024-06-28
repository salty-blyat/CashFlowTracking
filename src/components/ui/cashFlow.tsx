import { Card } from "antd";

function CashFlow({ expense, income }: { expense: number | undefined, income: number | undefined }) {
    return (
        <div className="flex justify-between w-full gap-x-2">
            <Card size='small' className="border-2 text-center border-red-500 w-1/2">
                <h1>Expense</h1>
                <h1>${expense || 0}</h1>
            </Card>

            <Card size='small' className="border-2 text-center border-green-500 w-1/2">
                <h1>Income</h1>
                <h1>${income || 0}</h1>
            </Card>
        </div>
    );
}
export default CashFlow;
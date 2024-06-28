import { Modal } from 'antd';
import React from 'react';

interface AddCategoryModalProps {
    openAddCategoryModal: boolean;
    handleAddCategoryModal: () => void;
    handleAddCategoryModalCancel: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
    openAddCategoryModal,
    handleAddCategoryModal,
    handleAddCategoryModalCancel
}) => {
    return (
        <Modal
            title='Add Category'
            open={openAddCategoryModal} // Use 'visible' instead of 'open' for Ant Design Modal
            onOk={handleAddCategoryModal}
            onCancel={handleAddCategoryModalCancel}
        >
            {/* Implement form or component for adding a new category */}
            <p>Add Category Form or Component</p>
        </Modal>
    );
};

export default AddCategoryModal;

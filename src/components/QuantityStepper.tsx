import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 1,
    max = 99,
    size = 'md',
}) => {
    const sizeClasses = {
        sm: 'h-7 text-sm',
        md: 'h-9 text-base',
        lg: 'h-11 text-lg',
    };

    const buttonSizeClasses = {
        sm: 'w-7 h-7',
        md: 'w-9 h-9',
        lg: 'w-11 h-11',
    };

    const iconSize = {
        sm: 14,
        md: 16,
        lg: 20,
    };

    return (
        <div className={`flex items-center gap-1 ${sizeClasses[size]}`}>
            <button
                onClick={onDecrease}
                disabled={quantity <= min}
                className={`${buttonSizeClasses[size]} flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press`}
                aria-label="Decrease quantity"
            >
                <Minus size={iconSize[size]} className="text-gray-600" />
            </button>

            <span className={`${buttonSizeClasses[size]} flex items-center justify-center font-semibold text-gray-800 min-w-[2.5rem]`}>
                {quantity}
            </span>

            <button
                onClick={onIncrease}
                disabled={quantity >= max}
                className={`${buttonSizeClasses[size]} flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press`}
                aria-label="Increase quantity"
            >
                <Plus size={iconSize[size]} className="text-white" />
            </button>
        </div>
    );
};

export default QuantityStepper;

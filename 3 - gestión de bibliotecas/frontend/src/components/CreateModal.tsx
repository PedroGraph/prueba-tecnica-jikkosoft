interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white p-6 rounded w-[500px] relative'>
        <h1 className='text-xl font-bold mb-4'>{title}</h1>
        <div className='space-y-4'>{children}</div>
        <div className='flex justify-end gap-2 mt-4'>
          <button 
            className='absolute top-2 right-2 p-2 h-8 w-8 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-full'
            onClick={onClose}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

interface CompensationLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { compensationLink: string }) => Promise<void>;
  currentLink?: string;
  isSubmitting: boolean;
}

export default function CompensationLinkModal({
  isOpen,
  onClose,
  onSubmit,
  currentLink,
  isSubmitting
}: CompensationLinkModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      compensationLink: currentLink || ''
    }
  });

  // Reset form when currentLink changes
  React.useEffect(() => {
    reset({ compensationLink: currentLink || '' });
  }, [currentLink, reset]);

  const handleFormSubmit = async (data: { compensationLink: string }) => {
    try {
      await onSubmit(data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating compensation link:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Compensation Link
              </h3>
              <div className="mt-4">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="compensationLink" className="block text-sm font-medium text-gray-700">
                      Compensation Link
                    </label>
                    <input
                      type="url"
                      id="compensationLink"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                      {...register('compensationLink', {
                        required: 'Compensation link is required',
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'Please enter a valid URL'
                        }
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.compensationLink && (
                      <p className="mt-1 text-sm text-red-600">{errors.compensationLink.message}</p>
                    )}
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
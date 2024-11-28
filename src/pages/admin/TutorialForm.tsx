import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateTutorialInput, UpdateTutorialInput, Tutorial } from '../../types';

interface TutorialFormProps {
  tutorial?: Tutorial;
  onSubmit: (data: CreateTutorialInput | UpdateTutorialInput) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function TutorialForm({ tutorial, onSubmit, isSubmitting, onCancel }: TutorialFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateTutorialInput>({
    defaultValues: tutorial ? {
      title: tutorial.title,
      description: tutorial.description,
      video_link: tutorial.video_link,
      is_public: tutorial.is_public,
    } : {
      is_public: true // Default to public for new tutorials
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          {...register('title', { required: 'Title is required' })}
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <div className="prose max-w-none">
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field: { onChange, value } }) => (
              <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
                config={{
                  toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'blockQuote',
                    'insertTable',
                    'undo',
                    'redo'
                  ],
                  placeholder: 'Enter the tutorial description...',
                  removePlugins: ['MediaEmbed', 'EasyImage'],
                  table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                  }
                }}
                disabled={isSubmitting}
              />
            )}
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="video_link" className="block text-sm font-medium text-gray-700">
          Video Link
        </label>
        <input
          type="url"
          id="video_link"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          {...register('video_link', { 
            required: 'Video link is required',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL'
            }
          })}
          disabled={isSubmitting}
        />
        {errors.video_link && (
          <p className="mt-1 text-sm text-red-600">{errors.video_link.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_public"
          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
          {...register('is_public')}
          disabled={isSubmitting}
        />
        <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700">
          Make this tutorial public
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
              Saving...
            </>
          ) : (
            'Save Tutorial'
          )}
        </button>
      </div>
    </form>
  );
}
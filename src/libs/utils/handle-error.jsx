import { notifications } from '@mantine/notifications';

export function handleError(prompt) {
  console.log(prompt);
  const error = prompt?.response?.data?.error?.message;
  console.log(error);
  const statusMessage = prompt?.response?.data?.statusMessage;
  notifications.show({
    title: 'Error',
    variant: 'error',
    message: prompt ? (
      <pre className='whitespace-pre-line'>{error || statusMessage}</pre>
    ) : null,
    color: 'red',
  });
}

import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { get } from '../utils/requests';

export default (
  endpoint: string,
  onSuccess?: () => any,
  onError?: () => any
) => {
  const { addToast } = useToasts();
  const histroy = useHistory();

  return useQuery(endpoint, () => get(endpoint), {
    onError: () => {
      if (onError) {
        onError();
        return;
      }
      histroy.push('/');
      addToast('Something went wrong', { appearance: 'error' });
    },
    onSuccess,
    retry: 2,
    refetchOnWindowFocus: false,
    // TODO: check implications
    useErrorBoundary: true,
  });
};

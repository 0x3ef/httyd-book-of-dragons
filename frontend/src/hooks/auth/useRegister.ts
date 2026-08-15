import { useMutation } from '@tanstack/react-query';
import { createUserAccount } from '../../api/services/authService';
import type { RegisterRequest, RegisterResponse } from '../../types/user';

export function useRegister() {
    return useMutation<RegisterResponse, Error, RegisterRequest>({
        mutationFn: createUserAccount,
  });
}
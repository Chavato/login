export const anonymizeCPF = (cpf: string): string => {
  return cpf.replace(/^(\d{3})/, "***");
};

export const isValidCPFFormat = (cpf: string): boolean => {
  const plainFormat = /^\d{11}$/;
  const maskedFormat = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  return plainFormat.test(cpf) || maskedFormat.test(cpf);
};

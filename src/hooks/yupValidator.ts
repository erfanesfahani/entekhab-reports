const yupValidator = (validation: any) => {
  const yupSync = {
    async validator({ field }: any, value: any) {
      await validation.validateSyncAt(field, { [field]: value });
    },
  };
  return yupSync;
};
export default yupValidator;

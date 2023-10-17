export const dateToJalali = (date: any) => {
  const normalizedDate = date
    .replace(/[٠-٩]/g, (d: string) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
    .replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const initialDate = normalizedDate?.split("/").join(",").normalize();
  const modifiedDate = new Date(initialDate);
  if (date) {
    return Intl.DateTimeFormat("fa-IR").format(modifiedDate);
  }
  return null;
};

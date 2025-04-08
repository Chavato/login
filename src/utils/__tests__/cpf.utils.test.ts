import { anonymizeCPF, isValidCPFFormat } from "../cpf.utils"; 

describe("anonymizeCPF", () => {
  it("should replace the first 3 digits with asterisks", () => {
    const result = anonymizeCPF("12345678900");
    expect(result).toBe("***45678900");
  });

  it("should return the same CPF if it has less than 3 digits", () => {
    const result = anonymizeCPF("12");
    expect(result).toBe("12");
  });

  it("should work with formatted CPF", () => {
    const result = anonymizeCPF("123.456.789-00");
    expect(result).toBe("***.456.789-00");
  });
});


describe("isValidCPFFormat", () => {
  it("should return true for plain CPF format", () => {
    expect(isValidCPFFormat("12345678900")).toBe(true);
  });

  it("should return true for masked CPF format", () => {
    expect(isValidCPFFormat("123.456.789-00")).toBe(true);
  });

  it("should return false for invalid CPF format", () => {
    expect(isValidCPFFormat("123-456-789-00")).toBe(false);
    expect(isValidCPFFormat("123.456.789.00")).toBe(false);
    expect(isValidCPFFormat("abc.def.ghi-jk")).toBe(false);
    expect(isValidCPFFormat("1234567890")).toBe(false);
  });
});

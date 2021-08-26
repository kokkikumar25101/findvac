/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVaccinationCenter = /* GraphQL */ `
  mutation CreateVaccinationCenter(
    $input: CreateVaccinationCenterInput!
    $condition: ModelVaccinationCenterConditionInput
  ) {
    createVaccinationCenter(input: $input, condition: $condition) {
      id
      tpa
      hospitalId
      hospitalName
      state
      district
      address
      pincode
      ownershipType
      mdCeoName
      contactNo
      mdCeoEmail
      latitude
      longitude
      estimatedVaccinePerDay
      createdAt
      updatedAt
    }
  }
`;
export const updateVaccinationCenter = /* GraphQL */ `
  mutation UpdateVaccinationCenter(
    $input: UpdateVaccinationCenterInput!
    $condition: ModelVaccinationCenterConditionInput
  ) {
    updateVaccinationCenter(input: $input, condition: $condition) {
      id
      tpa
      hospitalId
      hospitalName
      state
      district
      address
      pincode
      ownershipType
      mdCeoName
      contactNo
      mdCeoEmail
      latitude
      longitude
      estimatedVaccinePerDay
      createdAt
      updatedAt
    }
  }
`;
export const deleteVaccinationCenter = /* GraphQL */ `
  mutation DeleteVaccinationCenter(
    $input: DeleteVaccinationCenterInput!
    $condition: ModelVaccinationCenterConditionInput
  ) {
    deleteVaccinationCenter(input: $input, condition: $condition) {
      id
      tpa
      hospitalId
      hospitalName
      state
      district
      address
      pincode
      ownershipType
      mdCeoName
      contactNo
      mdCeoEmail
      latitude
      longitude
      estimatedVaccinePerDay
      createdAt
      updatedAt
    }
  }
`;

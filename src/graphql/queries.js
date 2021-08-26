/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVaccinationCenter = /* GraphQL */ `
  query GetVaccinationCenter($id: ID!) {
    getVaccinationCenter(id: $id) {
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
export const listVaccinationCenters = /* GraphQL */ `
  query ListVaccinationCenters(
    $filter: ModelVaccinationCenterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVaccinationCenters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;

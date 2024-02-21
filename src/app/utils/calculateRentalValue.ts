import { differenceInDays } from 'date-fns'

export interface CalculateRentalValueRequest {
  dailyRental: number
  increasePorcentage: number
  rentalDate: Date
  devolutionDate: Date
}

export function calculateRentalValue({
  dailyRental,
  increasePorcentage,
  rentalDate,
  devolutionDate,
}: CalculateRentalValueRequest): number {
  const rentalDays: number = differenceInDays(devolutionDate, rentalDate)
  const rentalValue: number = dailyRental * rentalDays
  const increase: number = rentalValue * increasePorcentage

  return rentalValue + increase
}

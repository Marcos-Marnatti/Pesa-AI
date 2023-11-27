import { UserService } from "src/@types/User"

export function handleTranslateGender(gender: string) {
  const translation = gender === 'MALE' ? 'Masculino' :
    gender === 'FEMALE' ? 'Feminino' : '';

  return translation;
}

export function handleTranslateGoal(goal: string) {
  const translation = goal === 'GAIN' ? 'Ganho de Massa' :
    goal === 'LOSE' ? 'Perda de gordura' :
      goal === 'MAINTAIN' ? 'Manutenção' : '';

  return translation;
}

export function handleTranslatePhysicalActivity(physicalActivity: string) {
  const translation = physicalActivity === 'NO' ? 'Sedentário' :
    physicalActivity === 'REGULAR' ? 'Intermediário' :
      physicalActivity === 'FREQUENT' ? 'Ativo' : '';

  return translation;
}
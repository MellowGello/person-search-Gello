//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, userSchema } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/prisma'

export async function searchUsers(query: string): Promise<User[]> {
  return prisma.user.findMany({
    where: { name: { contains: query } }
  })
}

export async function addUser(data: Omit<User, 'id'>): Promise<User> {
  const newUser = userSchema.parse({ ...data, id: crypto.randomUUID() })
  return prisma.user.create({ data: newUser })
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } })
  revalidatePath('/')
}

export async function updateUser(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
  const validatedData = userSchema.partial().parse(data)
  revalidatePath('/')
  return prisma.user.update({
    where: { id },
    data: validatedData,
  })
  
}

export const getUserById = cache(async (id: string) => {
  return prisma.user.findUnique({ where: { id } })
})

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
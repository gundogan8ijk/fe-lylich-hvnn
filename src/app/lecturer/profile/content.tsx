'use client'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  User as UserIcon,
  IdCard,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { InlineEditField } from '@/components/custom/Inline-Edit-Field'
import { storeLecturer } from '@/stores/store-item/lecturer-store'
import { Lecturer } from '@/types/lecurer-type'
import Loading from '@/components/utils/Loading'
import { getDateOnly } from '@/lib/display-variable-helper'

export default function ContentProfile() {

  const lecturerData = storeLecturer((e) => e.data);
  const isLoading = storeLecturer((e) => e.isLoading);

  const handleFieldSave = async (field: keyof Lecturer, value: string) => {

  }

  if (isLoading) return <Loading></Loading>
  if (!lecturerData) return <></>

  const fullName = ` ${lecturerData.lastName}${lecturerData.firstName}`
  const initials = `${lecturerData.lastName.charAt(0)}${lecturerData.firstName.charAt(0)}`

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      {/* Header với Avatar */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src={lecturerData.avatarUrl} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 sm:gap-4 mb-2">
                <Badge variant="outline" className="w-fit bg-sky-300/80 font-bold">
                  {lecturerData.code}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{fullName}</h2>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Thông tin cá nhân */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className='flex flex-col md:flex-row'>
            <div className="flex-1">
              <InlineEditField
                label="Họ"
                value={lecturerData.lastName}
                onSave={(value) => handleFieldSave('lastName', value)}
                icon={<UserIcon size={18} />}
              />
            </div>
            <div className="flex-1">
              <InlineEditField
                label="Tên"
                value={lecturerData.firstName}
                onSave={(value) => handleFieldSave('firstName', value)}
                icon={<UserIcon size={18} />}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className="flex-1">
              <InlineEditField
                label="Giới tính"
                value={lecturerData.gender}
                onSave={(value) => handleFieldSave('gender', value)}
                icon={<UserIcon size={18} />}
              />
            </div>
            <div className="flex-1">
              <InlineEditField
                label="Ngày sinh"
                value={getDateOnly(lecturerData.birthDate)}
                onSave={(value) => handleFieldSave('birthDate', value)}
                type="date"
                icon={<Calendar size={18} />}
              />
            </div>
          </div>
          
          <InlineEditField
            label="CMND/CCCD"
            value={lecturerData.citizenIdentificationCard}
            onSave={(value) => handleFieldSave('citizenIdentificationCard', value)}
            icon={<IdCard size={18} />}
          />
        </CardContent>
      </Card>

      {/* Thông tin liên hệ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <InlineEditField
            label="Email"
            value={lecturerData.email}
            onSave={(value) => handleFieldSave('email', value)}
            type="email"
            icon={<Mail size={18} />}
          />
          <InlineEditField
            label="Số điện thoại"
            value={lecturerData.phoneNumber}
            onSave={(value) => handleFieldSave('phoneNumber', value)}
            type="tel"
            icon={<Phone size={18} />}
          />
          <InlineEditField
            label="Địa chỉ"
            value={lecturerData.address}
            onSave={(value) => handleFieldSave('address', value)}
            icon={<MapPin size={18} />}
          />
          <InlineEditField
            label="Website"
            value={lecturerData.website}
            onSave={(value) => handleFieldSave('website', value)}
            type="url"
            icon={<Globe size={18} />}
          />
        </CardContent>
      </Card>

      {/* Education Table - Tạm thời ẩn */}
      {/* 
      <EducationTable
        educations={lecturerData.educations}
        onAdd={handleAddEducation}
        onEdit={handleEditEducation}
        onDelete={handleDeleteEducation}
      />
      */}
    </div>
  )
}

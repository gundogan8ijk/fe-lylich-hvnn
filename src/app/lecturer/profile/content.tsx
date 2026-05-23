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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { storeLecturer } from '@/stores/store-item/lecturer-store'
import Loading from '@/components/utils/Loading'
import { getDateOnly } from '@/lib/display-variable-helper'
import { AddressRequest, addressUpdateAction, avatarUpdateAction, birthDateUpdateAction, cCCDUpdateAction, deleteAddressAction, deleteAvatarAction, deleteEmailAction, deletePhoneAction, deleteWebsiteAction, emailUpdateAction, firstNameUpdateAction, genderUpdateAction, lastNameUpdateAction, phoneUpdateAction, UpdatePhoneRequest, websiteUpdateAction } from '@/hooks/lecturer-hook'
import FormPhoneNumber from '@/components/custom/from-input/from-phone-number'
import FormAddress from '@/components/custom/from-input/from-addres'
import { InlineEditField } from '@/components/custom/from-input/inline-edit-field'
import { InlineEditGenderField } from '@/components/custom/from-input/inline-edit-gender'
import { InlineEditCitizenIdField } from '@/components/custom/from-input/inline-edit-cccd'
import { InlineEditShell } from '@/components/custom/inline-edit-shell.tsx'
import { AvatarEdit } from '@/components/custom/AvatarEdit'
import { EducationSection } from './EducationSection'

export default function ContentProfile() {

  const lecturerData = storeLecturer((e) => e.data);
  const isLoading = storeLecturer((e) => e.isLoading);


  if (isLoading) return <Loading></Loading>
  if (!lecturerData) return <></>


  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl">
      {/* Header với Avatar */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <AvatarEdit
              avatarUrl={lecturerData.avatarUrl}
              fallback={lecturerData.firstName ?? ""}
              onSave={(url) => avatarUpdateAction(url)}
              onDelete={() => deleteAvatarAction()}
            />

            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-2 sm:gap-4 mb-2">
                <Badge variant="outline" className="w-fit bg-sky-300/80 font-bold">
                  {lecturerData.code}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{lecturerData.lastName} {lecturerData.firstName}</h2>
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
              <InlineEditField label="Họ" value={lecturerData.lastName}
                onSave={(value) => lastNameUpdateAction(value)} icon={<UserIcon size={18} />}
              />
            </div>
            <div className="flex-1">
              <InlineEditField label="Tên" value={lecturerData.firstName}
                onSave={(value) => firstNameUpdateAction(value)} icon={<UserIcon size={18} />}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className="flex-1">
              <InlineEditGenderField label="Giới tính" value={lecturerData.gender}
                onSave={(value) => genderUpdateAction(value)} icon={<UserIcon size={18} />}
              />
            </div>
            <div className="flex-1">
              <InlineEditField label="Ngày sinh" value={getDateOnly(lecturerData.birthDate)}
                onSave={(value) => birthDateUpdateAction(value)} type="date"
                icon={<Calendar size={18} />}
              />
            </div>
          </div>

          <InlineEditCitizenIdField label="CMND/CCCD" value={lecturerData.cccd}
            onSave={(value) => cCCDUpdateAction(value)} icon={<IdCard size={18} />}
          />
        </CardContent>
      </Card>

      {/* Thông tin liên hệ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <InlineEditField label="Email" value={lecturerData.email}
            onSave={(value) => emailUpdateAction(value)}
            type="email" icon={<Mail size={18} />} onDelete={() => deleteEmailAction()}
          />

          <InlineEditShell<UpdatePhoneRequest>
            label="Số điện thoại" value={lecturerData.phoneNumber}
            icon={<Phone size={18} />} onDelete={() => deletePhoneAction()}
            onSave={(value) => phoneUpdateAction(value)}

            renderInput={(editValue, setEditValue) => (
              <FormPhoneNumber editValue={editValue} setEditValue={setEditValue} />
            )}
          />

          <InlineEditShell<AddressRequest>
            label="Địa chỉ" value={lecturerData.address} onDelete={() => deleteAddressAction()}
            onSave={(value) => addressUpdateAction(value)} icon={<MapPin size={18} />}
            renderInput={(editValue, setEditValue) => (
              <FormAddress value={editValue} setValue={setEditValue} />
            )}
          />

          <InlineEditField label="Website" value={lecturerData.website} onDelete={() => deleteWebsiteAction()}
            onSave={(value) => websiteUpdateAction(value)} type="url" icon={<Globe size={18} />}
          />
        </CardContent>
      </Card>

      <EducationSection educations={lecturerData.educations} />
    </div>
  )
}

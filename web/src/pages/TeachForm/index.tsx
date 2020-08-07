import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')


    const [scheduleItens, setScheduleItens] = useState([
        {
            week_day: 0, from: '', to: ''
        },
    ])

    function addNewScheduleItem() {
        setScheduleItens([
            ...scheduleItens, {
                week_day: 0, from: '', to: ''
            }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItens.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem
        })
        setScheduleItens(updatedScheduleItems)
    }
    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(() => {
            alert('Cadastro realizado com sucesso')

            history.push('/')
        }).catch(() => {
            alert('erro no Cadastro')
        })

    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro passo e preencher esse formuláriode inscrição" />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            label="Nome Completo"
                            name="name" value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            label="Whatsapp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />

                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            label="Matéria"
                            name="subject"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciencias', label: 'Ciencias' },
                                { value: 'Educação Fisica', label: 'Educação Fisica' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Historia', label: 'Historia' },
                                { value: 'Matematica', label: 'Matematica' },
                                { value: 'Quimica', label: 'Quimica' },
                                { value: 'Portugues', label: 'Portugues' },
                                { value: 'Filosifia', label: 'Filosifia' },
                                { value: 'Sociologia', label: 'Sociologia' }
                            ]}
                        />
                        <Input
                            label="Custo da sua aula por hora"
                            name="cost"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Horarios disponiveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + novo horario
                            </button>
                        </legend>
                        {scheduleItens.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        label="Dia da semana"
                                        name="week_day"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' }
                                        ]} />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div >
    )
}

export default TeacherForm
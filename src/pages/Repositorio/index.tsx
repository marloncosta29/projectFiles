import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import api from '../../services/api'
import { Container, Owner, Loading, VoltarButton, IssuesList, PageAction, FilterList } from './styles'
import { FaArrowLeft } from 'react-icons/fa'
interface MatchParams {
  repositorio: any;
}

interface Props extends RouteComponentProps<MatchParams> {
}

const Repositorio: React.FunctionComponent<Props> = (props: Props) => {

  const [repositorio, setRepositorio] = useState()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [filters] = useState([
    { state: 'all', label: 'Todas', active: true },
    { state: 'open', label: 'Aberta', active: false },
    { state: 'closed', label: 'Fechadas', active: false }
  ]);
  const [filterIndex, setFilterIndex] = useState(0);
  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(props.match.params.repositorio);
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, { params: { state: filters.find(f => f.active)?.state, per_page: 5 } })
      ])
      setRepositorio(repositorioData.data)
      setIssues(issuesData.data)
      setLoading(false)
    }
    load();
  }, [filters, props.match.params.repositorio])

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = decodeURIComponent(props.match.params.repositorio);
      const response = await api.get(`repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5
        }
      })
      setIssues(response.data)
    }
    loadIssue()
  }, [filterIndex, filters, page, props.match.params.repositorio])

  function handlePage(action: string): void {
    const actualPage = action === 'back' ? page - 1 : page + 1;
    setPage(actualPage <= 0 ? 1 : actualPage)
  }
  function handleFilter(index: number) {
    setFilterIndex(index)
  }

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }


  return (
    <Container>
      <VoltarButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </VoltarButton>
      <Owner>
        <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
        <h1>{repositorio.name}</h1>

        <p>{repositorio.description}</p>
      </Owner>
      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button type="button" key={filter.label} onClick={() => handleFilter(index)}>{filter.label}</button>
        ))}
      </FilterList>

      <PageAction>
        <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>Anterior</button>
        <button type="button" onClick={() => handlePage('next')}>Proxima</button>
      </PageAction>
      <IssuesList>
        {
          issues.map((i: any) => {
            return (
              <li key={String(i.id)}>
                <img src={i.user.avatar_url} alt={i.user.login} />
                <div>
                  <strong>
                    <a href={i.html_url}>{i.title}</a>
                    {i.labels.map((l: any) => (
                      <span key={String(l.id)}>{l.name}</span>
                    ))}
                  </strong>
                  <p>{i.user.login}</p>
                </div>
              </li>)
          })
        }
      </IssuesList>


    </Container>)
}
export default Repositorio
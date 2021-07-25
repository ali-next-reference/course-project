import ButtonPrimary from '../ui/button-primary';
import classes from './results-title.module.css';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  if(!date){
    return (
    <section className={classes.title}>
    <h1>{props.children}</h1>
    <ButtonPrimary link='/events'>Show all events</ButtonPrimary>
  </section>
    )
  }

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <ButtonPrimary link='/events'>Show all events</ButtonPrimary>
    </section>
  );
}

export default ResultsTitle;

import { memo } from 'react';
import { Switch, Route } from 'react-router-dom';

const Exclude = memo(({ path = [], children }) => {
  return (
    <Switch>
      <Route exact path={path} />
      <Route path="*">{children}</Route>
    </Switch>
  );
});

export default Exclude;

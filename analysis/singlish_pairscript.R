# load data frame and re-factorize
tempdf.singlish <- read.csv("C:/Users/flick/Documents/Github/singlish/data/data.csv") # full data frame
tempdf.singlish$id <- as.factor(tempdf.singlish$id)
tempdf.singlish$speaker <- as.factor(tempdf.singlish$speaker)
tempdf.singlish$clip <- as.factor(tempdf.singlish$clip)

# create new columns for the acoustic features of the other clip in the trial
tempdf.singlish <- tempdf.singlish %>%
  mutate(
    csyllablespersec_pair = NA,
    cst_pitchpvi_new_pair = NA,
    cstvar_new_pair = NA,
    cnpviV_nophrasefinal_pair = NA
  )

# function to fill out acoustic features from the other clip in the trial
for (i in 1:(nrow(tempdf.singlish) - 1)) {
  if (tempdf.singlish$trial_number_block[i + 1] == tempdf.singlish$trial_number_block[i]) {
    tempdf.singlish$csyllablespersec_pair[i] <- tempdf.singlish$csyllablespersec[i + 1]
    tempdf.singlish$cst_pitchpvi_new_pair[i] <- tempdf.singlish$cst_pitchpvi_new[i + 1]
    tempdf.singlish$cstvar_new_pair[i] <- tempdf.singlish$cstvar_new[i + 1]
    tempdf.singlish$cnpviV_nophrasefinal_pair[i] <- tempdf.singlish$cnpviV_nophrasefinal[i + 1]
  } else {
    tempdf.singlish$csyllablespersec_pair[i] <- tempdf.singlish$csyllablespersec[i - 1]
    tempdf.singlish$cst_pitchpvi_new_pair[i] <- tempdf.singlish$cst_pitchpvi_new[i - 1]
    tempdf.singlish$cstvar_new_pair[i] <- tempdf.singlish$cstvar_new[i - 1]
    tempdf.singlish$cnpviV_nophrasefinal_pair[i] <- tempdf.singlish$cnpviV_nophrasefinal[i - 1]
  }
}

# create column that is the difference in values of acoustic features between clips in a trial
tempdf.singlish <- tempdf.singlish %>%
  mutate(
    csyllablespersec_diff = csyllablespersec-csyllablespersec_pair,
    cst_pitchpvi_new_diff = cst_pitchpvi_new-cst_pitchpvi_new_pair,
    cstvar_new_diff = cstvar_new-cstvar_new_pair,
    cnpviV_nophrasefinal_diff = cnpviV_nophrasefinal-cnpviV_nophrasefinal_pair
  )

# center difference values
tempdf.singlish <- tempdf.singlish %>%
  mutate(across(csyllablespersec_diff:cnpviV_nophrasefinal_diff, scale, scale = FALSE, .names = '{.col}_c'))

# create column that is the absolute value of centered difference values
tempdf.singlish <- tempdf.singlish %>%
  mutate(
    csyllablespersec_diff_c_abs = abs(csyllablespersec_diff_c),
    cst_pitchpvi_new_diff_c_abs = abs(cst_pitchpvi_new_diff_c),
    cstvar_new_diff_c_abs = abs(cstvar_new_diff_c),
    cnpviV_nophrasefinal_diff_c_abs = abs(cnpviV_nophrasefinal_diff_c)
  )

# save data frame
write.csv(tempdf.singlish, file="C:/Users/flick/Documents/Github/singlish/data/data_pairs.csv", row.names=FALSE)
<template>
  <div>
    <Spinner :spinning="isSpinning" />
    <div v-if="!isSpinning" class="profile-card">
      <div class="profile">
        <div class="profile-picture">
          <img
            :src="userProfileData.profile_picture"
            class="profile-picture-img"
          />
        </div>
        <p>{{ userProfileData.name }}</p>
      </div>
      <div class="job-experiences">
        <p>Experiences</p>
        <div
          class="experiences"
          v-for="(experience, index) in userProfileData.job_experience"
          :key="`${index} + 1`"
        >
          <img :src="experience.company_logo" width="40" height="40" />
          <span class="company">{{ experience.company }}</span>
          <span class="experience-time">
            {{ dateText(experience.start_time, experience.end_time) }}
            &#8226;
            {{ calcExperienceTime(experience.start_time, experience.end_time) }}
          </span>
          <div
            class="company-experiences"
            v-for="(companyExperiences, innerIndex) in experience.experiences"
            :key="`${innerIndex} - 1`"
          >
            <span class="job-title">{{ companyExperiences.job_title }}</span>
            <span class="title-experience-time">
              {{
                dateText(
                  companyExperiences.start_time,
                  companyExperiences.end_time
                )
              }}
              &#8226;
              {{
                calcExperienceTime(
                  companyExperiences.start_time,
                  companyExperiences.end_time
                )
              }}
            </span>
            <div class="job-info-block">
              <p class="job-description">
                {{ companyExperiences.job_description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GetProfileData from "../service/GetProfileData";
import Spinner from "./Spinner.vue";

export default {
  name: "ProfileCard",
  components: {
    Spinner,
  },
  data() {
    return {
      userProfileData: null,
      isSpinning: true,
    };
  },
  mounted() {
    this.loadProfileData();
  },
  methods: {
    loadProfileData() {
      GetProfileData.getData()
        .then((response) => {
          if (response.status === 200) {
            this.userProfileData = response.data;
          }
        })
        .finally(() => (this.isSpinning = false));
    },
    calcExperienceTime(startDate, endTime) {
      startDate = new Date(this.convertDateFormat(startDate)).getTime();
      endTime =
        endTime === ""
          ? new Date().getTime()
          : new Date(this.convertDateFormat(endTime)).getTime();
      const year = new Date(endTime - startDate).getFullYear() - 1970;
      const month = new Date(endTime - startDate).getMonth() + 1;

      return `
        ${year >= 1 ? (year === 1 ? `${year} year ` : `${year} years `) : ""}${
        month >= 1 ? (month === 1 ? `${month} month ` : `${month} months `) : ""
      }
        `;
    },
    dateText(startDate, endDate) {
      endDate =
        endDate === ""
          ? "Present"
          : new Date(this.convertDateFormat(endDate)).toLocaleDateString(
              "en-us",
              {
                year: "numeric",
                month: "short",
              }
            );
      return `${new Date(this.convertDateFormat(startDate)).toLocaleDateString(
        "en-us",
        {
          year: "numeric",
          month: "short",
        }
      )} - ${endDate}`;
    },
    convertDateFormat(date) {
      return `${date.split("-")[1]}-${date.split("-")[0]}-${
        date.split("-")[2]
      }`;
    },
  },
};
</script>
<style>
.profile-card {
  display: flex;
  background-image: linear-gradient(
    45deg,
    rgba(130, 134, 132, 0.6),
    rgba(30, 34, 32, 0.6),
    rgba(124, 141, 133, 0.6)
  );
  width: 70%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
}

.profile {
  text-align: center;
  padding: 5px;
  height: fit-content;
}

.profile p {
  padding: 5px;
  font-size: 24px;
}

.profile-picture {
  width: fit-content;
  overflow: hidden;
  border-radius: 50%;
}

.profile-picture-img {
  width: 320px;
  height: 240px;
}

@media only screen and (max-width: 1320px) {
  .profile-picture-img {
    width: 240px;
    height: 180px;
  }
}

@media only screen and (max-width: 1150px) {
  .experience-time {
    display: block;
    padding-left: 10px;
    padding-bottom: 5px;
  }

  .title-experience-time {
    display: block;
    padding-left: 0;
    position: relative;
  }

  .company-experiences:not(.company-experiences:last-child) .title-experience-time::before {
    content: "";
    left: 0;
    top: 50%;
    transform: translate(-300%, -50%);
    background-color: green;
    position: absolute;
    width: 5px;
    height: 110%;
  }
}

@media only screen and (max-width: 860px) {
  .profile-card {
    flex-direction: column;
  }

  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5px;
    height: fit-content;
  }

  .experiences {
    padding: 0px !important;
  }
}

.job-experiences > p {
  font-size: 30px;
}

.experiences {
  font-size: 16px;
  padding-left: 50px;
}

.company {
  position: relative;
  padding-left: 5px;
}

/* .company::before {
  content: "";
  width: 20px;
  height: 20px;
  background: green;
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(-150%, -50%);
  border-radius: 50%;
} */

.company-experiences {
  padding-left: 32px;
}

.job-title {
  position: relative;
}

.company,
.job-title {
  font-size: 17px;
}

.job-title::before {
  content: "";
  width: 12px;
  height: 12px;
  background: green;
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(-150%, -50%);
  border-radius: 50%;
}

.job-info-block {
  position: relative;
}

.company-experiences:not(.company-experiences:last-child)
  .job-info-block
  ::before {
  content: "";
  position: absolute;
  width: 5px;
  height: 100%;
  left: 0;
  top: 50%;
  transform: translate(-300%, -50%);
  background-color: green;
}

.title-experience-time,
.experience-time {
  font-size: 13px;
  font-style: italic;
  padding-left: 10px;
}

.title-experience-time,
.experience-time {
  color: rgb(122, 122, 122) !important;
}

.job-description {
  font-size: 14px;
  padding: 15px;
  margin: 0;
}
</style>
